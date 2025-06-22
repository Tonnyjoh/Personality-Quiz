import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import Header from './components/Header';
import Question from './components/Question';
import Results from './components/Results';
import UserForm from './components/UserForm';
import './index.css';

function App() {
    // Quiz data
    const questions = [
        {
            question: "What's your favorite color?",
            options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
        },
        {
            question: "What's your ideal weekend activity?",
            options: ["Adventure sports 🏔️", "Swimming or beach 🏖️", "Gardening or hiking 🌿", "Reading or writing ✍️"],
        },
        {
            question: "Which season do you prefer?",
            options: ["Summer ☀️", "Winter ❄️", "Spring 🌸", "Fall 🍂"],
        },
        {
            question: "What motivates you most?",
            options: ["Achievement 🏆", "Harmony 🕊️", "Security 🏠", "Freedom 🦋"],
        },
        {
            question: "How do you handle stress?",
            options: ["Take action 💪", "Go with the flow 🌊", "Stay grounded 🧘", "Think it through 💭"],
        }
    ];

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const keywords = {
        Fire: "fire",
        Water: "water",
        Earth: "earth",
        Air: "air",
    };

    const elements = {
        "Red 🔴": "Fire",
        "Blue 🔵": "Water",
        "Green 🟢": "Earth",
        "Yellow 🟡": "Air",
        "Adventure sports 🏔️": "Fire",
        "Swimming or beach 🏖️": "Water",
        "Gardening or hiking 🌿": "Earth",
        "Reading or writing ✍️": "Air",
        "Summer ☀️": "Fire",
        "Winter ❄️": "Water",
        "Spring 🌸": "Earth",
        "Fall 🍂": "Air",
        "Achievement 🏆": "Fire",
        "Harmony 🕊️": "Water",
        "Security 🏠": "Earth",
        "Freedom 🦋": "Air",
        "Take action 💪": "Fire",
        "Go with the flow 🌊": "Water",
        "Stay grounded 🧘": "Earth",
        "Think it through 💭": "Air"
    };

    // State management
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [userName, setUserName] = useState('');
    const [element, setElement] = useState('');
    const [artwork, setArtwork] = useState(null);

    // Handler functions
    function handleAnswer(answer) {
        setAnswers([...answers, answer]);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    function handleUserFormSubmit(name) {
        setUserName(name);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function determineElement(answers) {
        const counts = {};
        answers.forEach((answer) => {
            const element = elements[answer];
            counts[element] = (counts[element] || 0) + 1;
        });
        return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    }

    // Fetch artwork from Met Museum API
    async function fetchArtwork(keyword) {
        try {
            const searchResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}&hasImages=true`);
            const searchData = await searchResponse.json();

            if (searchData.objectIDs && searchData.objectIDs.length > 0) {
                const randomIndex = Math.floor(Math.random() * Math.min(20, searchData.objectIDs.length));
                const objectId = searchData.objectIDs[randomIndex];

                const objectResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`);
                const objectData = await objectResponse.json();

                if (objectData.primaryImage) {
                    setArtwork(objectData);
                } else {
                    const fallbackIndex = Math.floor(Math.random() * Math.min(10, searchData.objectIDs.length));
                    const fallbackId = searchData.objectIDs[fallbackIndex];
                    const fallbackResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${fallbackId}`);
                    const fallbackData = await fallbackResponse.json();
                    setArtwork(fallbackData);
                }
            }
        } catch (error) {
            console.error('Error fetching artwork:', error);
            setArtwork(null);
        }
    }

    // UseEffect for quiz completion
    useEffect(() => {
        if (currentQuestionIndex === questions.length && answers.length > 0) {
            const selectedElement = determineElement(answers);
            setElement(selectedElement);
            fetchArtwork(keywords[selectedElement]).then();
        }
    }, [currentQuestionIndex, answers]);

    return (
        <UserProvider value={{ name: userName, setName: setUserName }}>
            <Router>
                <div className="app">
                    <Header />
                    <main>
                        <Routes>
                            <Route
                                path="/"
                                element={<UserForm onSubmit={handleUserFormSubmit} />}
                            />
                            <Route
                                path="/quiz"
                                element={
                                    currentQuestionIndex < questions.length ? (
                                        <Question
                                            question={questions[currentQuestionIndex].question}
                                            options={questions[currentQuestionIndex].options}
                                            onAnswer={handleAnswer}
                                        />
                                    ) : (
                                        <Results element={element} artwork={artwork} />
                                    )
                                }
                            />
                        </Routes>
                    </main>
                </div>
            </Router>
        </UserProvider>
    );
}

export default App;