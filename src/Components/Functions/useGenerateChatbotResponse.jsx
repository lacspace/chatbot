// useGenerateChatbotResponse.js
import { useEffect } from 'react';

const useGenerateChatbotResponse = () => {
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

  // Function to generate a chatbot response based on the user's input
  const generateChatbotResponse = async (userMessage, filteredResponses, setChatMessages) => {
    // Simulate typing effect and provide additional AI-like responses after a delay
    const simulateTypingEffect = (message, delay) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(message);
        }, delay);
      });
    };

    // Generate a response based on the user's input
    if (filteredResponses.length > 0) {
      const matchedResponse = filteredResponses[0];
      const newMessage = generateChatbotMessage(matchedResponse.answer);
      addChatbotResponse(newMessage, setChatMessages);
    } else if (userMessage.toLowerCase().includes('current time')) {
      // If the user asks for the current time, generate a response with the current time
      const currentTime = new Date().toLocaleTimeString();
      const timeResponse = generateChatbotMessage(`The current time is: ${currentTime}`);
      addChatbotResponse(timeResponse, setChatMessages);
    } else if (userMessage.toLowerCase().includes('current date')) {
      // If the user asks for the current date, generate a response with the current date
      const currentDate = new Date().toLocaleDateString();
      const dateResponse = generateChatbotMessage(`The current date is: ${currentDate}`);
      addChatbotResponse(dateResponse, setChatMessages);
    } else {
      // If no matching response is found and it's not a current time/date query,
      // handle complex math expressions or provide a default message
      try {
        // Use a custom math parser function to handle complex math expressions
        const result = evaluateMathExpression(userMessage);
        if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
          // If the result is a valid number, create a response with the result
          const formattedResult = parseFloat(result.toFixed(2)); // Show the result with two decimal places
          const mathResponse = generateChatbotMessage(`The result of ${userMessage} is: ${formattedResult}`);
          addChatbotResponse(mathResponse, setChatMessages);
        } else {
          // If the result is not a valid number (e.g., Infinity, NaN), provide a default message
          const defaultMessage = generateChatbotMessage(
            "Sorry, the calculation result is not valid or exceeds the limit I can handle."
          );
          addChatbotResponse(defaultMessage, setChatMessages);
        }
      } catch (error) {
        // If there is an error in evaluating the expression, provide a default message
        const defaultMessage = generateChatbotMessage(
          "Sorry, but I'm programmed to provide information and assistance related to the stock market and our company, Growth Securities. If you have any queries or need guidance in these areas, please feel free to ask. Otherwise, please type another related word or rephrase your question."
        );
        addChatbotResponse(defaultMessage, setChatMessages);
      }
    }

    const aiResponses = [
      "I'm here to help you!",
      "Sure, I'm ready to assist.",
      "You're doing great! Keep going.",
      "Hmm, let me think...",
      "I'm learning every day to be more helpful!",
      "Great! How can I assist you further?",
      "You got it! I'm here to answer your questions.",
    ];

    const aiResponse = await simulateTypingEffect(aiResponses[Math.floor(Math.random() * aiResponses.length)], 800);
    const aiMessage = generateChatbotMessage(aiResponse);
    addChatbotResponse(aiMessage, setChatMessages);
  };

  // Helper function to evaluate complex math expressions
  const evaluateMathExpression = (expression) => {
    // Implement your custom math parser here, or use existing libraries like 'math.js'
    // For this example, I'll use the built-in 'eval()' function
    return eval(expression);
  };

  return generateChatbotResponse;
};

export default useGenerateChatbotResponse;
