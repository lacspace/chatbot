import React, { useEffect, useRef } from 'react';
import ChatMessage from '../ChatMessage/ChatMessage';

const ChatMessages = ({ chatMessages }) => {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    scrollToBottomWithAnimation();
  }, [chatMessages]);

  const scrollToBottomWithAnimation = () => {
    const chatMessagesContainer = chatMessagesRef.current;
    if (chatMessagesContainer) {
      chatMessagesContainer.scrollTo({
        top: chatMessagesContainer.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="chat-messages" ref={chatMessagesRef}>
      {chatMessages.map((message, index) => (
        <ChatMessage
          user={message.user}
          message={message.message}
          key={index}
        />
      ))}
    </div>
  );
};

export default ChatMessages;
