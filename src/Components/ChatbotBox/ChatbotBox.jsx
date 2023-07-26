import React, { useState } from 'react';
import Chatbot from '../Chatbot/Chatbot';
import '../Chatbot/Style.scss';
const Box = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenBox = () => {
        setIsOpen(true);
    };
    const handleCloseBox = () => {
        setIsOpen(false);
    };
    return (
        <div className="box">
            {isOpen ? (
                <div className="box-content">
                    <Chatbot className="chatbot-container" />
                    <button onClick={handleCloseBox}>Close Box</button>
                </div>
            ) : (
                <div className="box-content">
                    <h2>Closed Box</h2>
                    <button onClick={handleOpenBox}>Open Box</button>
                </div>
            )}
        </div>
    );
};
export default Box;