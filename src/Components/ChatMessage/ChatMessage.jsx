import React from 'react';
import userIcon from '../Icons/user1.png';
import botIcon from '../Icons/logo.jpeg';
import Autolinker from 'react-autolinker';

const ChatMessage = ({ user, message }) => {
  return (
    <div className={`chat-message ${user ? 'user' : 'chatbot'}`}>
      {user ? (
        <div className="user-message">
          {/* <img src={userIcon} alt="User Icon" className="icon" /> */}
          <Autolinker className='msgSpan' text={message} />
        </div>
      ) : (
        <div className="chatbot-message">
          <Autolinker className='msgSpan' text={message} />
          {/* <img src={botIcon} alt="Bot Icon" className="icon" /> */}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;

