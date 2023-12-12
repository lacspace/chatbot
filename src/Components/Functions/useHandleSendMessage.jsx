import { useEffect, useState } from 'react';

const useHandleSendMessage = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [rememberedInfo, setRememberedInfo] = useState(null);
  const [rememberMode, setRememberMode] = useState(false);

  // Function to simulate typing effect and AI-like response delay
  const simulateTypingEffect = (message, delay) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(message);
      }, delay);
    });
  };

  const handleSendMessage = async () => {
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
          generateChatbotResponse(trimmedInput, setChatMessages);
        }, 1500);
      }
    }
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

  // Helper function to generate a chatbot response message
  const generateChatbotMessage = (message) => {
    return {
      user: false,
      message: message,
    };
  };

  // Helper function to add the chatbot response to the chat messages
  const addChatbotResponse = (response, setChatMessages) => {
    setChatMessages((prevMessages) => [...prevMessages, response]);
  };

  // Helper function to evaluate complex math expressions
  const evaluateMathExpression = (expression) => {
    // Implement your custom math parser here, or use existing libraries like 'math.js'
    // For this example, I'll use the built-in 'eval()' function
    return eval(expression);
  };

  // Function to generate a chatbot response based on the user's input
  const generateChatbotResponse = async (userMessage, setChatMessages) => {
    // ... (existing code)

    const aiResponses = [
      "I'm here to help you!",
      "Sure, I'm ready to assist.",
      "You're doing great! Keep going.",
      "Hmm, let me think...",
      "I'm learning every day to be more helpful!",
      "Great! How can I assist you further?",
      "You got it! I'm here to answer your questions.",
    ];

    // ... (existing code)
  };

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

  return {
    handleSendMessage,
    handleChangeUserInput,
    chatMessages,
  };
};

export default useHandleSendMessage;
