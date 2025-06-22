import React, { useContext } from "react";
import { UserContext } from './UserContext';

export default function Results({ element, artwork }) {
    const { name } = useContext(UserContext);

    const elementDescriptions = {
        Fire: "You are passionate, energetic, and full of life! Like fire, you bring warmth and light to those around you.",
        Water: "You are adaptable, intuitive, and emotionally deep. Like water, you flow gracefully through life's challenges.",
        Earth: "You are grounded, reliable, and nurturing. Like earth, you provide stability and support to others.",
        Air: "You are free-spirited, intellectual, and communicative. Like air, you bring fresh perspectives and ideas."
    };

    const elementEmojis = {
        Fire: "🔥",
        Water: "🌊",
        Earth: "🌍",
        Air: "💨"
    };

    return (
        <div className="results-container">
            <h2>Quiz Results</h2>
            <div className="result-card">
                <h3>
                    {elementEmojis[element]} <strong>{name}</strong>, your element is: {element}! {elementEmojis[element]}
                </h3>
                <p className="element-description">
                    {elementDescriptions[element]}
                </p>
            </div>

            {artwork ? (
                <div className="artwork">
                    <h3>Your Element's Artwork</h3>
                    <div className="artwork-card">
                        <h4>{artwork.title}</h4>
                        <img
                            src={artwork.primaryImage}
                            alt={artwork.title}
                        />
                        <p><strong>Artist:</strong> {artwork.artistDisplayName || 'Unknown'}</p>
                        <p><strong>Date:</strong> {artwork.objectDate || 'Unknown'}</p>
                    </div>
                </div>
            ) : (
                <div className="loading-artwork">
                    <p>🎨 Loading artwork for your element...</p>
                </div>
            )}

            <button
                className="restart-button"
                onClick={() => window.location.href = '/'}
            >
                Take Quiz Again
            </button>
        </div>
    );
}