import React from 'react';
import ChatMessages from '../ChatMessages/ChatMessages';
import UserInput from '../UserInput/UserInput';

const ChatbotContainer = ({ chatMessages, userInput, handleChangeUserInput, handleSendMessage, chatContainerRef }) => {
  return (
    <>
    <div className="chatbot-container">
      <ChatMessages chatMessages={chatMessages} />
      <UserInput
        userInput={userInput}
        handleChangeUserInput={handleChangeUserInput}
        handleSendMessage={handleSendMessage}
        chatContainerRef={chatContainerRef}
      />
    </div>
    </>
  );
};

export default ChatbotContainer;
