import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

export default function UserForm({ onSubmit }) {
    const [inputName, setInputName] = useState('');
    const { setName } = useContext(UserContext);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (inputName.trim()) {
            setName(inputName);
            onSubmit(inputName);
            navigate('/quiz');
        }
    }

    return (
        <div className="user-form-container">
            <h2>Welcome to the Element Personality Quiz!</h2>
            <p>Discover which of the four elements best represents your personality</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter your name to get started:
                    <input
                        type="text"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        placeholder="Your name..."
                        required
                    />
                </label>
                <button type="submit">
                    Start Quiz 🚀
                </button>
            </form>
        </div>
    );
}