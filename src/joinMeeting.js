import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import * as Constants from './constants'


function JoinMeeting() {
    const [meetingCode, setMeetingCode] = useState('');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (message === 'Attendee added!') {
            console.log('Attendee added!');
            navigate('/meeting');
        }
    }, [message]);

    const joinMeetingCall = (index) => {
        fetch(/* Constants.backendUrl + */`http://127.0.0.1:5000/join_meeting`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "meeting_id": meetingCode, "name": username })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data.message);
            setMessage(data.message);
        });
    };

    const handleJoinMeeting = () => {
        console.log(`Joining meeting with code ${meetingCode} as ${username}`);
        joinMeetingCall();
    };

    return (
        <div className="App">
            <h1>To Join a Meeting-in-Progress</h1>
            <p>Enter Meeting Code:</p>
            <input type="text" value={meetingCode} onChange={(e) => setMeetingCode(e.target.value)} />
            <br />
            <p>Enter Your Name:</p>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <br /><br />
            <Button onClick={handleJoinMeeting}>Join Meeting</Button>
        </div>
    );
}

export default JoinMeeting;