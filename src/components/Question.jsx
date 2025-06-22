import React from "react";

export default function Question({ question, options, onAnswer }) {
    return (
        <div className="question-container">
            <h2>{question}</h2>
            <div className="options-container">
                {options.map(function (option) {
                    return (
                        <button
                            key={option}
                            className="option-button"
                            onClick={function () {
                                onAnswer(option);
                            }}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}