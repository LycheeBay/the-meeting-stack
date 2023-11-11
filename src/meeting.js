import React, { useState, useEffect } from 'react';
import * as Constants from './constants'

function Meeting() {
    const [stack, setStack] = useState([]);
    const [directResponse, setDirectResponse] = useState('');
    const [meetingCode, setMeetingCode] = useState(localStorage.getItem("meeting_id"));
    const [username, setUsername] = useState(localStorage.getItem("name"));
    const [refreshStack, setRefreshStack] = useState(false);
    const [addStack, setAddStack] = useState(false);
    const [addDirectResponse, setAddDirectResponse] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch(`${Constants.backendUrl}/get-stack`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "meeting_id": meetingCode})
        })
            .then(response => response.json())
            .then(data => setStack([data.stack]));

            fetch(`${Constants.backendUrl}/get-direct-response`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "meeting_id": meetingCode})
            })
            .then(response => response.json())
            .then(data => setDirectResponse(data.directResponse));
    }, [refreshStack]);

    // const for add to stack

    const addToStack = () => {
        console.log(Constants.backendUrl);
        fetch(`${Constants.backendUrl}/add-to-stack`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "meeting_id": meetingCode, "name": username })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(data.message);
                setMessage(data.message);
                handleRefreshStack();
            });
    };

    const handleRefreshStack = () => {
        setRefreshStack(!refreshStack);
    };
    
    return (
        <div>
            <h1>Meeting Stack</h1>
            <p>Meeting Code: {meetingCode}</p>
            <p>{message !== '' && "Message: " + message}</p>
            <p>Stack: {stack}</p>
            <button onClick={handleRefreshStack}>Refresh Stack</button>
            <button onClick={() => addToStack()}>Add to Stack</button>
            <p>Direct Response: {directResponse}</p>

        </div>
    );
}

export default Meeting;
