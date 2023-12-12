// useChatbotFilter.js
import { useMemo } from 'react';

const useChatbotFilter = (userInput, chatData, sampleChat, companyChat) => {
  return useMemo(() => {
    const matchingResponses = [];

    const filterQuery = (query) => {
      const trimmedQuery = query.toLowerCase().trim();
      return trimmedQuery === userInput.toLowerCase();
    };

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
  }, [userInput, chatData, sampleChat, companyChat]);
};

export default useChatbotFilter;
