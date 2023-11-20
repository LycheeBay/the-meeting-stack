import Button from 'react-bootstrap/Button';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import * as Constants from './constants'
import { NameContext } from './App';

function NewMeeting() {
    const [meetingName, setMeetingName] = useState('');
    const [username, setUsername] = useState(useContext(NameContext));
    const [message, setMessage] = useState('');
    const [meetingId, setMeetingId] = useState(-1);
    const navigate = useNavigate();

    useEffect(() => {
        if (message === 'Meeting added!') {
            console.log('Meeting added!');
            navigate('/meeting');
        }
    }, [message]);

    useEffect(() => {
        localStorage.setItem("meeting_id", meetingId);
        setUsername(username);
    }, [meetingId]);

    const newMeetingCall = (index) => {
        console.log(Constants.backendUrl);
        fetch(`${Constants.backendUrl}/new-meeting`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "name": meetingName, "attendees": username })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data.message);
            setMessage(data.message);
            setMeetingId(data.meeting_id);
        });
    };

    const handleNewMeeting = () => {
        console.log(`Making new meeting with meeting name ${meetingName} as ${username}`);
        newMeetingCall();
    };

    return (
        <NameContext.Provider value={username}>
        <div className="App">
            <h1>To Create a New Meeting</h1>
            <p>Enter Meeting Name:</p>
            <input type="text" value={meetingName} onChange={(e) => setMeetingName(e.target.value)} />
            <br />
            <p>Enter Your Name:</p>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <br /><br />
            <Button onClick={handleNewMeeting}>New Meeting</Button>
        </div>
        </NameContext.Provider>
    );
}

export default NewMeeting;
