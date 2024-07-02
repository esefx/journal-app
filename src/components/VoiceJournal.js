import React, { useState } from 'react';
import AudioRecorder from './AudioRecorder';

const VoiceJournal = () => {
    const [audioDataList, setAudioDataList] = useState([]);
    const [textJournal, setTextJournal] = useState('');

    const handleAudioData = (audioData) => {
        setAudioDataList(prevList => [...prevList, audioData]);
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
                {audioDataList.map((audioData, index) => (
                    <audio key={index} src={audioData} controls />
                ))}
        </div>
    );
};

export default VoiceJournal;