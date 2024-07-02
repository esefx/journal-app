import React, { useRef, useState } from 'react';
import axios from 'axios';

const AudioRecorder = ({ onAudioData }) => {
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);

    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null); //blob URL

    // const [audioString, setAudioString] = useState(null); //string to be saved in datasbe

    const getMicPermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true});
                setPermission(true);
                setStream(mediaStream)
            } catch (error) {
                alert(error.message);
            }
        } else {
            alert("Audio Recording not supported on this browser.");
        }
    };

    const startRecording = async () => {
        setRecordingStatus("recording");
        const media = new MediaRecorder(stream, { type: 'audio/mp3;'});
        mediaRecorder.current = media;
        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === 'undefined') return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks)
    };

    const stopRecording = async () => {
        setRecordingStatus("inactive");
        mediaRecorder.current.stop()
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/mp3;'});
            const audioURL = URL.createObjectURL(audioBlob);
            setAudio(audioURL);
            setAudioChunks([]);
    
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = async () => {
                const base64String = reader.result;
    
                // Send the audio data to the server
                axios.post('https://7055-2601-282-2380-df70-70df-1159-1407-c347.ngrok-free.app/form', {
                    audioData: base64String
                })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
    
                onAudioData(base64String)
            }
        };
    };


    return (
        <div>
            <div className='audio-controls'>
                {!permission ? (<button onClick={getMicPermission} type='button'>Get Mic</button>): null}
                {permission && recordingStatus === 'inactive' ? (<button onClick={startRecording} type='button'>Start Recording </button>):null}
                {permission && recordingStatus === 'recording' ? (<button onClick={stopRecording} type='button'>Stop Recording </button>):null }
            </div>
            { audio ? (
                <div className='audio-container'>
                    <audio src={audio} controls></audio>
                </div>
            ):null }
        </div>
    )

};

export default AudioRecorder;