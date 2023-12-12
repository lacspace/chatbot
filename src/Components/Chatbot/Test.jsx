import React, { useState, useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import ChatbotContainer from '../ChatbotContainer/ChatbotContainer';
import chatData from '../Chats/Data.json';
import sampleChat from '../Chats/ChatSample.json';
import companyChat from '../Chats/CompanyChats.json';
import './Style.scss';



const Chatbot = () => {

  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [rememberedInfo, setRememberedInfo] = useState(null);
  const [rememberMode, setRememberMode] = useState(false);
  const [userQueries, setUserQueries] = useState([]);
  const chatContainerRef = useRef(null);

  // Function to simulate typing effect and AI-like response delay
  const simulateTypingEffect = (message, delay) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(message);
      }, delay);
    });
  };

  // Send message after getting input
  const handleSendMessage = async (event) => {
    event.preventDefault();
    const trimmedInput = userInput.trim();
    if (trimmedInput !== '') {
      // Check if the user wants the chatbot to remember something
      if (trimmedInput.toLowerCase().startsWith('remember')) {
        // Enter remembering mode
        setRememberMode(true);
        const rememberResponse = {
          user: false,
          message: 'Sure, I can remember one thing at a time. Please tell me what you want me to remember:',
        };
        setChatMessages((prevMessages) => [...prevMessages, rememberResponse]);
        setUserInput('');
      } else if (rememberMode) {
        // If the chatbot is in the remembering mode, store the information and exit remembering mode
        const infoToRemember = trimmedInput;
        setRememberedInfo({ text: infoToRemember, timestamp: Date.now() });
        setRememberMode(false);

        // Add a response indicating that the chatbot has remembered the information
        const rememberResponse = {
          user: false,
          message: `Sure, I will remember: "${infoToRemember}" for the next 5-10 minutes.`,
        };
        setChatMessages((prevMessages) => [...prevMessages, rememberResponse]);

        setUserInput('');
        // Provide an AI-like response to the user's input after a delay
        const aiResponse = await simulateTypingEffect('Great! How can I assist you further?', 800);
        const aiMessage = {
          user: false,
          message: aiResponse,
        };

        setChatMessages((prevMessages) => [...prevMessages, aiMessage]);

        setUserInput('');
      } else if (trimmedInput.toLowerCase().includes('what did i tell you to remember')) {
        // Check if the user wants to know what they asked the chatbot to remember
        if (rememberedInfo) {
          // If the chatbot is remembering something, provide the remembered information
          const rememberedResponse = {
            user: false,
            message: `You asked me to remember: "${rememberedInfo.text}"`,
          };
          setChatMessages((prevMessages) => [...prevMessages, rememberedResponse]);

          setUserInput('');
        } else {
          // If the chatbot is not remembering anything, inform the user
          const noMemoryResponse = {
            user: false,
            message: "I don't have anything to remember at the moment.",
          };
          setChatMessages((prevMessages) => [...prevMessages, noMemoryResponse]);
        }
      } else {
        // If the user is not asking the chatbot to remember or inquire about the remembered information
        // Create a new message object
        const newMessage = {
          user: true,
          message: trimmedInput,
        };
        // Add the new message to the chat messages
        setChatMessages((prevMessages) => [...prevMessages, newMessage]);
        // Clear the user input
        setUserInput('');
        // Scroll to the bottom of the chat container
        scrollToBottomWithAnimation();
        // Generate chatbot response after a delay
        setTimeout(() => {
          const matchingResponses = filterResponses(trimmedInput);
          if (matchingResponses.length > 0) {
            // If a matching response is found, create a new message object
            // ... existing code ...
          } else {
            // If no matching response is found, handle fallback
            handleFallback();
          }
        }, 1500);
      }
    }
  };

  // Random AI response
  const generateRandomAIResponse = () => {
    const aiResponses = [
      "Hmm, interesting query! Let me think...",
      "Oh, that's a great question!",
      "Looks like you really need some help.",
      "Impressive! Let me find the best answer for you.",
      "You've got me thinking now!",
      "I'm on it! One moment please.",
      "Thanks for asking! I'm here to assist.",
      "Let me put my knowledge to use!",
    ];
    return aiResponses[Math.floor(Math.random() * aiResponses.length)];
  };

  // Suggestions for users
  const suggestions = [
    "Tell me about the stock market", 
    "What services do you offer?", 
    "Who is the CEO?", 
    "What is the company's vision?"
  ];

  // Handle fallback or when not found any relative ans
  const fallbackResponses = [
    "I'm sorry, I didn't quite get that. Could you please rephrase your question?",
    "Apologies, I'm still learning and might not understand some queries. Here are some popular topics you can ask about: [List of topics].",
    "Hmm, I'm not sure what you mean. Let me know if you need information about stocks, market trends, or our company.",
    "Sorry, but I'm programmed to provide information and assistance related to the stock market and our company, Growth Securities. If you have any queries or need guidance in these areas, please feel free to ask. Otherwise, please type another related word or rephrase your question.",
  ];
  
  const handleFallback = () => {
    const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    const fallbackMessage = {
      user: false,
      message: randomResponse,
    };
    setChatMessages((prevMessages) => [...prevMessages, fallbackMessage]);
  
    // Optionally, you can also provide suggestions after multiple queries without a match
    if (userQueries.length >= 2) {
      const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      const suggestionMessage = {
        user: false,
        message: `It seems like you're looking for information related to "${userInput}". Why not try asking something like: "${suggestion}"`,
      };
      setChatMessages((prevMessages) => [...prevMessages, suggestionMessage]);
    }
  };

  // Helper function to generate a random delay for AI responses
  const getRandomDelay = () => Math.floor(Math.random() * 500) + 500; // Random delay between 500ms to 1000ms

  // Generate a response from the chatbot
  const generateChatbotResponse = async (userMessage) => {
    const matchingResponses = filterResponses(userMessage);

    if (matchingResponses.length > 0) {
      // If a matching response is found, create a new message object
      const matchedResponse = matchingResponses[0];
      const randomAIResponse = generateRandomAIResponse();
      const newMessage = {
        user: false,
        message: `${randomAIResponse} ${matchedResponse.answer}`,
      };
      // Add the new message to the chat messages with a random delay
      setTimeout(() => {
        setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      }, getRandomDelay());

    } else if (userMessage.toLowerCase().includes('current time')) {
      // If the user asks for the current time, generate a response with the current time
      const currentTime = new Date().toLocaleTimeString();
      const timeResponse = {
        user: false,
        message: `The current time is: ${currentTime}`,
      };

      // Add the time response to the chat messages
      setChatMessages((prevMessages) => [...prevMessages, timeResponse]);
    } else if (userMessage.toLowerCase().includes('current date')) {
      // If the user asks for the current date, generate a response with the current date
      const currentDate = new Date().toLocaleDateString();
      const dateResponse = {
        user: false,
        message: `The current date is: ${currentDate}`,
      };

      // Add the date response to the chat messages
      setChatMessages((prevMessages) => [...prevMessages, dateResponse]);
    } else {
      // If no matching response is found and it's not a current time/date query,
      // handle complex math expressions or provide a default message
      try {
        // Use a custom math parser function to handle complex math expressions
        const result = evaluateMathExpression(userMessage);
        if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
          // If the result is a valid number, create a response with the result
          const formattedResult = parseFloat(result.toFixed(2)); // Show the result with two decimal places
          const mathResponse = {
            user: false,
            message: `The result of ${userMessage} is: ${formattedResult}`,
          };

          // Add the math response to the chat messages
          setChatMessages((prevMessages) => [...prevMessages, mathResponse]);
        } else {
          // If the result is not a valid number (e.g., Infinity, NaN), provide a default message
          const defaultMessage = {
            user: false,
            message: "Sorry, the calculation result is not valid or exceeds the limit I can handle.",
          };

          // Add the default message to the chat messages
          setChatMessages((prevMessages) => [...prevMessages, defaultMessage]);
        }
      } catch (error) {
        // If there is an error in evaluating the expression, provide a default message
        // const defaultMessage = {
        //   user: false,
        //   message: "Sorry, but I'm programmed to provide information and assistance related to the stock market and our company, Growth Securities. If you have any queries or need guidance in these areas, please feel free to ask. Otherwise, please type another related word or rephrase your question.",
        // };

        handleFallback();
        // Add the default message to the chat messages
        // setChatMessages((prevMessages) => [...prevMessages, defaultMessage]);
      }
    }

    // Simulate typing effect and provide additional AI-like responses after a delay
    const aiResponses = [
      "I'm here to help you!",
      "Sure, I'm ready to assist.",
      "You're doing great! Keep going.",
      "Hmm, let me think...",
      "I'm learning every day to be more helpful!",
      "Great! How can I assist you further?",
      "You got it! I'm here to answer your questions.",
      "Investing in knowledge pays the best interest.",
      "The more you learn, the more confident you become in your decisions.",
      "In the realm of knowledge, there's no such thing as too much!",
      "Learning is a treasure that will follow you wherever you go.",
      "Knowledge empowers us to reach new heights.",
    ];

    const randomAIResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
    const aiMessage = {
      user: false,
      message: randomAIResponse,
    };


    // Add the AI-like response to the chat messages with a random delay
    setTimeout(() => {
      setChatMessages((prevMessages) => [...prevMessages, aiMessage]);
    }, getRandomDelay());

    // Check for stock market related interactions and add funny quotes or appreciation
    if (userMessage.toLowerCase().includes('stock') || userMessage.toLowerCase().includes('market')) {
      const stockResponses = [
        "Stock market is fascinating, isn't it?",
        "Remember, investing is a long-term game.",
        "Invest in knowledge before investing in stocks.",
        "I wish I could invest in humor, it would never go down.",
        "Let's stock up some knowledge!",
        "In the stock market, the only thing that goes up and down is your heartbeat.",
        "The stock market can be as unpredictable as the weather, but with the right knowledge, you can navigate its twists and turns.",
        "Did you know that some investors follow the 'buy low, sell high' strategy? It's a classic mantra in the stock market!",
        "In the world of stocks, diversification is like having a safety net. Spreading your investments can reduce risks.",
        "Investing in the stock market is like a journey. Sometimes you need to weather the storm to reach your destination.",
        "Remember, it's not just about the numbers in the stock market; it's also about understanding the companies behind the stocks.",
        "The stock market is full of stories of rags to riches and vice versa. It's a roller-coaster of emotions and opportunities.",
      ];

      const stockResponse = await simulateTypingEffect(stockResponses[Math.floor(Math.random() * stockResponses.length)], 1200);
      const stockMessage = {
        user: false,
        message: stockResponse,
      };

      setChatMessages((prevMessages) => [...prevMessages, stockMessage]);
    }
  };

  // Helper function to evaluate complex math expressions
  const evaluateMathExpression = (expression) => {
    // Implement your custom math parser here, or use existing libraries like 'math.js'
    // For this example, I'll use the built-in 'eval()' function
    return eval(expression);
  };

  // Filter the responses based on user input
  const filterResponses = (userMessage) => {
    const matchingResponses = [];

    const filterQuery = (query) => {
      const trimmedQuery = query.toLowerCase().trim();
      return trimmedQuery === userMessage.toLowerCase();
    };

    // Filter responses from the chatData
    if (chatData && chatData.responses && Array.isArray(chatData.responses)) {
      chatData.responses.forEach((response) => {
        const queries = response.query.toLowerCase().split(',').map((query) => query.trim());

        if (queries.some(filterQuery)) {
          matchingResponses.push(response);
        }
      });
    } else {
      console.error('chatData is missing or not properly formatted.');
    }

    // Filter responses from the sampleChat
    if (sampleChat && sampleChat.responses && Array.isArray(sampleChat.responses)) {
      sampleChat.responses.forEach((response) => {
        const queries = response.query.toLowerCase().split(',').map((query) => query.trim());

        if (queries.some(filterQuery)) {
          matchingResponses.push(response);
        }
      });
    } else {
      console.error('sampleChat is missing or not properly formatted.');
    }

    // Filter responses from the companyChat
    if (companyChat && companyChat.responses && Array.isArray(companyChat.responses)) {
      companyChat.responses.forEach((response) => {
        const queries = response.query.toLowerCase().split(',').map((query) => query.trim());

        if (queries.some(filterQuery)) {
          matchingResponses.push(response);
        }
      });
    } else {
      console.error('companyChat is missing or not properly formatted.');
    }

    return matchingResponses;
  };

  // Handler for updating user input
  const handleChangeUserInput = (event) => {
    setUserInput(event.target.value);
  };

  // Scroll to the bottom of the chat container with animation
  const scrollToBottomWithAnimation = () => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  // Initialize the chat with sample messages
  const initializeChat = () => {
    if (sampleChat && sampleChat.messages && Array.isArray(sampleChat.messages)) {
      const initialMessages = sampleChat.messages.map((message) => ({
        user: message.user,
        message: message.message,
      }));
      setChatMessages(initialMessages);
    } else {
      console.error('Sample chat messages are missing or not properly formatted.');
    }
  };

  // Update userQueries whenever a new user message is sent
  // useEffect(() => {
  //   if (userInput.trim() !== '') {
  //     setUserQueries((prevQueries) => [...prevQueries, userInput.trim()]);
  //   }
  // }, [userInput]);

  // Remembered information clearlification
  useEffect(() => {
    const clearRememberedInfo = () => {
      setRememberedInfo(null);
      // Optionally, you can add a response indicating that the chatbot has forgotten the information.
      // For example:
      // const forgetResponse = {
      //   user: false,
      //   message: `I have forgotten the information I previously remembered.`,
      // };
      // setChatMessages((prevMessages) => [...prevMessages, forgetResponse]);
    };

    // Set a timer to clear the remembered information after the specified duration (e.g., 5 minutes)
    const timer = setTimeout(clearRememberedInfo, 5 * 60 * 1000); // 5 minutes (in milliseconds)

    // Clean up the timer when the component is unmounted or the rememberedInfo state changes
    return () => clearTimeout(timer);
  }, [rememberedInfo]);

  // Initialize the chat on component mount
  useEffect(() => {
    initializeChat();
  }, []);

  // Scroll to the bottom of the chat container when chat messages change
  useEffect(() => {
    scrollToBottomWithAnimation();
  }, [chatMessages]);

  // Scroll to the bottom of the chat container when the chat container ref changes
  useEffect(() => {
    scrollToBottomWithAnimation();
  }, [chatContainerRef.current]);

  // Render the Chatbot component
  return (
    <div className="wrapper centerBody">
      <div className="centerBot">
        <div className="typer">
          <TypeAnimation
            sequence={[
              "Welcome to our Growth chatbot! How can I assist you today? Feel free to ask any questions or seek guidance on your journey! 😊"
            ]}
            wrapper="div"
            cursor={false}
            repeat={true}
            style={{
              color: "#269ed6",
              fontSize: "14px",
            }}
          />
        </div>
        <hr width="100%" />
        <ChatbotContainer
          chatMessages={chatMessages}
          userInput={userInput}
          handleChangeUserInput={handleChangeUserInput}
          handleSendMessage={handleSendMessage}
          chatContainerRef={chatContainerRef}
        />
      </div>
    </div>
  );
};

export default Chatbot;
