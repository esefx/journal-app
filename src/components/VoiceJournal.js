import React, { useState } from 'react';
import AudioRecorder from './AudioRecorder';

// map of emotion names to colors
const emotionColors = {
    "Confusion": "#FFA07A",   // Light Salmon
    "Contemplation": "#20B2AA", // Light Sea Green
    "Realization": "#FFD700"  // Gold

};

const VoiceJournal = () => {
    const [audioEntries, setAudioEntries] = useState([]);
    const [textJournal, setTextJournal] = useState('');

    const handleAudioData = (data) => {
        setAudioEntries(prevList => [...prevList, data]);
    };

    const handleTextChange = (event) => {
        setTextJournal(event.target.value);
    };

    return (
        <div>
            <h2>Text Journal</h2>
            <textarea
                value={textJournal}
                onChange={handleTextChange}
                placeholder="Write your journal entry here..."
                rows={5}
                cols={50}
            />
            <h1>Audio Journal</h1>
            <AudioRecorder onAudioData={handleAudioData} />

            <h2>Recorded Entries</h2>
            {audioEntries.map((entry, index) => (
                <div key={index} className="audio-entry">
                    <audio src={entry.audioURL} controls />
                    <div className="emotion-container">
                        {entry.emotions.map((emotion, idx) => (
                            <div key={idx} className="emotion-item">
                                <div 
                                    className="emotion-circle" 
                                    style={{ backgroundColor: emotionColors[emotion.name] || '#D3D3D3' }} // Default color if not found
                                ></div>
                                <span>{emotion.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VoiceJournal;
