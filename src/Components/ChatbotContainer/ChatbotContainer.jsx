import React from 'react';
import ChatMessages from '../ChatMessages/ChatMessages';
import UserInput from '../UserInput/UserInput';

const ChatbotContainer = ({ chatMessages, userInput, handleChangeUserInput, handleSendMessage, chatContainerRef, chatOptionsEnabled }) => {
  return (
    <>
      <div className="chatbot-container">
        {chatMessages.length > 0 && <ChatMessages chatMessages={chatMessages} />}
        {!chatOptionsEnabled && (
          <UserInput
            userInput={userInput}
            handleChangeUserInput={handleChangeUserInput}
            handleSendMessage={handleSendMessage}
            chatContainerRef={chatContainerRef}
          />
        )}
      </div>
    </>
  );
};

export default ChatbotContainer;
