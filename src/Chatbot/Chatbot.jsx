import React, { useState, useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import chatData from './Data.json';
import sampleChat from './ChatSample.json';
import companyChats from './CompanyChats.json';
import userIcon from './Icons/user1.png';
import botIcon from './Icons/bot1.jpg';
import './Style.scss';

const Chatbot = () => {
  // State variables
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const chatContainerRef = useRef(null);

  // Function to handle sending a user message
  const handleSendMessage = (event) => {
    event.preventDefault();
    const trimmedInput = userInput.trim();
    if (trimmedInput !== '') {
      const newMessage = {
        user: true,
        message: trimmedInput,
      };
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      setUserInput('');
      scrollToBottomWithAnimation();
      setTimeout(scrollToBottomWithAnimation, 100);

      generateChatbotResponse(trimmedInput); // Call the generateChatbotResponse function here
    }
  };

  // Function to generate a chatbot response
  const generateChatbotResponse = (userMessage) => {
    const matchingResponses = filterResponses(userMessage);

    if (matchingResponses.length > 0) {
      const matchedResponse = matchingResponses[0];

      const newMessage = {
        user: false,
        message: matchedResponse.answer,
      };

      setTimeout(() => {
        setChatMessages((prevMessages) => [...prevMessages, newMessage]);
        scrollToBottomWithAnimation();
      }, 500);
      setTimeout(scrollToBottomWithAnimation, 600);
    } else {
      const defaultMessage = {
        user: false,
        message: "I'm sorry, but I'm programmed to provide information and assistance related to the stock market and our company, Growth Securities. If you have any queries or need guidance in these areas, please feel free to ask. Otherwise, please type another related word or rephrase your question."
      };

      setTimeout(() => {
        setChatMessages((prevMessages) => [...prevMessages, defaultMessage]);
        scrollToBottomWithAnimation();
      }, 500);
      setTimeout(scrollToBottomWithAnimation, 600);
    }
  };

  // Function to filter responses from chatData, sampleChat, and companyChats
  const filterResponses = (userMessage) => {
    const matchingResponses = [];

    // Filter responses from chatData
    if (chatData && chatData.responses && Array.isArray(chatData.responses)) {
      chatData.responses.forEach((response) => {
        const queries = response.query.toLowerCase().split(',').map((query) => query.trim());

        if (queries.some((query) => userMessage.toLowerCase().includes(query))) {
          matchingResponses.push(response);
        }
      });
    } else {
      console.error('chatData is missing or not properly formatted.');
    }

    // Filter responses from sampleChat
    if (sampleChat && sampleChat.responses && Array.isArray(sampleChat.responses)) {
      sampleChat.responses.forEach((response) => {
        const queries = response.query.toLowerCase().split(',').map((query) => query.trim());

        if (queries.some((query) => userMessage.toLowerCase().includes(query))) {
          matchingResponses.push(response);
        }
      });
    } else {
      console.error('sampleChat is missing or not properly formatted.');
    }

    // Filter responses from companyChats
    if (companyChats && companyChats.responses && Array.isArray(companyChats.responses)) {
      companyChats.responses.forEach((response) => {
        const queries = response.query.toLowerCase().split(',').map((query) => query.trim());

        if (queries.some((query) => userMessage.toLowerCase().includes(query))) {
          matchingResponses.push(response);
        }
      });
    } else {
      console.error('companyChats is missing or not properly formatted.');
    }

    return matchingResponses;
  };

  // Function to handle user input change
  const handleChangeUserInput = (event) => {
    setUserInput(event.target.value);
  };

  // Function to scroll to the bottom of the chat container with animation
  const scrollToBottomWithAnimation = () => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  // Function to initialize the chat with sample messages
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

  // Initialize the chat when the component mounts
  useEffect(() => {
    initializeChat();
  }, []);

  return (
    <div className="wrapper centerBody">
      <div className="centerBot">
        <div className="chatbot-container">
          <div className="typer">
            <TypeAnimation
              sequence={[
                "Welcome to our Growth chatbot! How can I assist you today? Feel free to ask any questions or seek guidance on your journey."
              ]}
              wrapper="div"
              cursor={false}
              repeat={true}
              style={{
                color: "#269ed6",
                fontWeight: "600",
                letterSpacing: "1px",
                fontFamily: "'Poppins'",
              }}
            />
          </div>
          <hr width="100%" />
          <div className="chat-messages" ref={chatContainerRef}>
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.user ? 'user' : 'chatbot'}`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {message.user ? (
                  <>
                    <div className="user-message">
                      <img src={userIcon} alt="User Icon" className="icon" />
                      <span>{message.message}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="chatbot-message">
                      <span>{message.message}</span>
                      <img src={botIcon} alt="Bot Icon" className="icon" />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="inputs">
            <form onSubmit={handleSendMessage} className="user-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={userInput}
                onChange={handleChangeUserInput}
              />
              <button type="submit">
                <span>➤</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
