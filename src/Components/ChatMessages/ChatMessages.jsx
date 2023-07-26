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




// import React, { useEffect, useRef, useState } from 'react';
// import ChatMessage from '../ChatMessage/ChatMessage';

// const ChatMessages = ({ chatMessages }) => {
//   const chatMessagesRef = useRef(null);
//   const [messages, setMessages] = useState([]);
//   const [showClosingMessage, setShowClosingMessage] = useState(false);
//   const [hasUserInteracted, setHasUserInteracted] = useState(false);

//   useEffect(() => {
//     setMessages(chatMessages);
//   }, [chatMessages]);

//   useEffect(() => {
//     scrollToBottomWithAnimation();
//   }, [messages]);

//   useEffect(() => {
//     let timer;

//     const startClosingTimer = () => {
//       timer = setTimeout(showClosingMessageFunc, 30000); // 30 seconds
//     };

//     const showClosingMessageFunc = () => {
//       setShowClosingMessage(true);
//     };

//     const resetClosingTimer = () => {
//       clearTimeout(timer);
//       setShowClosingMessage(false);
//       startClosingTimer();
//     };

//     startClosingTimer();

//     return () => {
//       clearTimeout(timer);
//     };
//   }, []);

//   const scrollToBottomWithAnimation = () => {
//     const chatMessagesContainer = chatMessagesRef.current;
//     if (chatMessagesContainer) {
//       chatMessagesContainer.scrollTo({
//         top: chatMessagesContainer.scrollHeight,
//         behavior: 'smooth',
//       });
//     }
//   };

//   const handleUserInteraction = () => {
//     if (!hasUserInteracted) {
//       setHasUserInteracted(true);
//     }
//   };

//   return (
//     <div className="chat-messages" ref={chatMessagesRef} onClick={handleUserInteraction}>
//       {messages.map((message, index) => (
//         <ChatMessage user={message.user} message={message.message} key={index} />
//       ))}
//       {showClosingMessage && !hasUserInteracted && (
//         <ChatMessage
//           user={false}
//           message="Oops! It seems we couldn't crack the code of your query this time. But don't worry, we're always here to assist you. Feel free to come back anytime with your puzzling questions, and we'll be ready to solve them together. Keep calm and chat on!"
//         />
//       )}
//     </div>
//   );
// };

// export default ChatMessages;
