import React from 'react';
import userIcon from '../Icons/user1.png';
import botIcon from '../Icons/bot1.jpg';

const ChatMessage = ({ user, message }) => {
  return (
    <div className={`chat-message ${user ? 'user' : 'chatbot'}`}>
      {user ? (
        <div className="user-message">
          <img src={userIcon} alt="User Icon" className="icon" />
          <span>{message}</span>
        </div>
      ) : (
        <div className="chatbot-message">
          <span>{message}</span>
          <img src={botIcon} alt="Bot Icon" className="icon" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage