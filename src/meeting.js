import React, { useState, useEffect } from 'react';
import * as Constants from './constants'

function Meeting() {
    const [stack, setStack] = useState([]);
    const [directResponse, setDirectResponse] = useState('');
    const [meetingCode, setMeetingCode] = useState(localStorage.getItem("meeting_id"));
    const [refreshStack, setRefreshStack] = useState(false);

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

    const addToStack = (index) => {
        console.log(Constants.backendUrl);
        fetch(`${Constants.backendUrl}/add-to-stack`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "meeting_id": meetingCode, "item": index })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(data.message);
                setStack(data.stack);
            });
    };

    const handleRefreshStack = () => {
        setRefreshStack(!refreshStack);
    };
    
    return (
        <div>
            <h1>Meeting Stack</h1>
            <p>Meeting Code: {meetingCode}</p>
            <p>Stack: {stack}</p>
            <button onClick={handleRefreshStack}>Refresh Stack</button>
        </div>
    );
}

export default Meeting;
