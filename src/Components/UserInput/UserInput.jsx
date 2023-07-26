import React from 'react';

const UserInput = ({ userInput, handleChangeUserInput, handleSendMessage }) => {
  return (
    <>
      <section className="footerInput">
        <div className="inputContainer">
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
      </section>
    </>
  );
};

export default UserInput;
