import React, { useState, useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import ChatbotContainer from '../ChatbotContainer/ChatbotContainer';
import chatData from '../Chats/Data.json';
import sampleChat from '../Chats/ChatSample.json';
import companyChat from '../Chats/CompanyChats.json';
import './Style.scss';

const Chatbot = () => {
  // State variables
  const [chatMessages, setChatMessages] = useState([]); // Stores the chat messages
  const [userInput, setUserInput] = useState(''); // Stores the user input
  const chatContainerRef = useRef(null); // Ref to the chat container DOM element

  // Handler for sending user messages
  const handleSendMessage = (event) => {
    event.preventDefault();
    const trimmedInput = userInput.trim();
    if (trimmedInput !== '') {
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
        generateChatbotResponse(trimmedInput);
      }, 1500);
    }
  };

  // Generate a response from the chatbot
  // Generate a response from the chatbot
const generateChatbotResponse = (userMessage) => {
  const matchingResponses = filterResponses(userMessage);

  if (matchingResponses.length > 0) {
    // If a matching response is found, create a new message object
    const matchedResponse = matchingResponses[0];
    const newMessage = {
      user: false,
      message: matchedResponse.answer,
    };
    // Add the new message to the chat messages
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
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
    // handle math expressions or provide a default message
    const mathExpressionRegex = /(\d+)\s*([+\-*/])\s*(\d+)/;
    const mathExpressionMatch = userMessage.match(mathExpressionRegex);

    if (mathExpressionMatch) {
      // If the user input is a math expression, calculate the result
      const operand1 = parseFloat(mathExpressionMatch[1]);
      const operator = mathExpressionMatch[2];
      const operand2 = parseFloat(mathExpressionMatch[3]);

      let result;
      switch (operator) {
        case '+':
          result = operand1 + operand2;
          break;
        case '-':
          result = operand1 - operand2;
          break;
        case '*':
          result = operand1 * operand2;
          break;
        case '/':
          result = operand1 / operand2;
          break;
        default:
          result = 'Invalid operator';
      }

      const mathResponse = {
        user: false,
        message: `The result of ${operand1} ${operator} ${operand2} is: ${result}`,
      };

      // Add the math response to the chat messages
      setChatMessages((prevMessages) => [...prevMessages, mathResponse]);
    } else {
      // If it's neither a matching response nor a math expression, provide a default message
      const defaultMessage = {
        user: false,
        message:
          "I'm sorry, but I'm programmed to provide information and assistance related to the stock market and our company, Growth Securities. If you have any queries or need guidance in these areas, please feel free to ask. Otherwise, please type another related word or rephrase your question.",
      };

      // Add the default message to the chat messages
      setChatMessages((prevMessages) => [...prevMessages, defaultMessage]);
    }
  }
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
