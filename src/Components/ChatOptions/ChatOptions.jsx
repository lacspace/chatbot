import React, { useState, useEffect } from 'react';
import chatOptionsData from '../Chats/chatOptionsData.json';
import Autolinker from 'react-autolinker'

const ChatOptions = () => {
    // State for storing chat options and selected options
    const [mainOptions] = useState(chatOptionsData);
    const [selectedMainOption, setSelectedMainOption] = useState(null);
    const [selectedSubOption, setSelectedSubOption] = useState(null);
    const [disableAllOptions, setDisableAllOptions] = useState(false);

    // Effect to re-enable options when the component mounts
    useEffect(() => {
        setDisableAllOptions(false);
    }, []);

    // Function to handle the selection of main options
    const handleMainOptionSelect = (mainOptionId) => {
        setSelectedMainOption(mainOptionId);
        setSelectedSubOption(null);
        setDisableAllOptions(true);

        setTimeout(() => {
            const subOptionsSection = document.getElementById('sub-options-section');
            subOptionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setDisableAllOptions(false);
        }, 800);
    };

    // Function to handle the selection of sub-options
    const handleSubOptionSelect = (mainOptionId, subOptionId) => {
        setSelectedSubOption(subOptionId);
        setDisableAllOptions(true);

        setTimeout(() => {
            const infoSection = document.getElementById('info-section');
            infoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setDisableAllOptions(false);
        }, 800);
    };

    // Function to get the response for the selected sub-option
    const getResponseForSubOption = (subOptionId) => {
        const selectedOption = mainOptions.find((mainOption) =>
            mainOption.subOptions.some((subOption) => subOption.id === subOptionId)
        );
        const selectedSubOption = selectedOption.subOptions.find((subOption) => subOption.id === subOptionId);
        return selectedSubOption.response;
    };

    // Function to handle going back to main options
    const handleBackToMainOptions = () => {
        setSelectedMainOption(null);
        setSelectedSubOption(null);

        const mainOptionsSection = document.getElementById('main-options-section');
        mainOptionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Function to handle going back to the previous option
    const handleBackToPreviousOption = () => {
        setSelectedSubOption(null);
        const subOptionsSection = document.getElementById('sub-options-section');
        subOptionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="chat-options">
            {/* Main Options Section */}
            <div id="main-options-section">
                <h3>Please choose your topic to proceed:</h3>
                {mainOptions.map((mainOption) => (
                    <div key={mainOption.id} className="option">
                        <button
                            onClick={() => handleMainOptionSelect(mainOption.id)}
                            disabled={disableAllOptions || selectedMainOption !== null}
                            aria-label={`Choose ${mainOption.name}`}
                        >
                            {mainOption.name}
                        </button>
                    </div>
                ))}
            </div>
            {/* Sub Options Section */}
            <div id="sub-options-section">
                {selectedMainOption && (
                    <div className="selected-main-option">
                        <h3>Please choose any options to solve your query:</h3>
                        <div className="sub-options">
                            {mainOptions
                                .find((mainOption) => mainOption.id === selectedMainOption)
                                .subOptions.map((subOption) => (
                                    <div key={subOption.id} className="option">
                                        <button
                                            className={`${selectedSubOption === subOption.id ? 'selected-suboption' : ''}`}
                                            onClick={() => handleSubOptionSelect(selectedMainOption, subOption.id)}
                                            disabled={disableAllOptions || selectedSubOption !== null}
                                            aria-label={`Choose ${subOption.name}`}
                                        >
                                            {subOption.name}
                                        </button>
                                    </div>
                                ))}
                            <button className='homeIcon' onClick={handleBackToMainOptions} disabled={disableAllOptions} aria-label="Back to Main Options">
                                <i className="fa fa-home"></i> Main Options
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {/* Information Section */}
            <div id="info-section">
                {selectedSubOption && (
                    <div className="info-sectionLast">
                        <h3>
                            {selectedSubOption.name}
                        </h3>
                        <p className='lastAns'>
                            <Autolinker text={getResponseForSubOption(selectedSubOption)} />
                        </p>
                        <button onClick={handleBackToMainOptions} disabled={disableAllOptions} aria-label="Back to Main Options">
                            <i className="fa fa-home"></i> Main Options
                        </button>
                        <button onClick={handleBackToPreviousOption} disabled={disableAllOptions} aria-label="Back to Previous Option">
                            <i className="fa fa-arrow-left"></i> Previous Option
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatOptions;