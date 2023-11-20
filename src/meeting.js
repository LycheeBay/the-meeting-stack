import React, { useState, useEffect, useContext } from 'react';
import * as Constants from './constants';
import { NameContext } from './App';

function Meeting() {
    const [stack, setStack] = useState([]);
    const [directResponse, setDirectResponse] = useState('');
    const [meetingCode, setMeetingCode] = useState(localStorage.getItem("meeting_id"));
    const username = useContext(NameContext);
    const [refresh, setRefresh] = useState(false);
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
            .then(data => setDirectResponse(data.direct_response));
    }, [refresh]);

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
                handleRefresh();
            });
    };

    // const for remove from stack

    const removeFromStack = () => {
        console.log(Constants.backendUrl);
        fetch(`${Constants.backendUrl}/remove-from-stack`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "meeting_id": meetingCode, "name": username })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(data.message);
                setMessage(data.message);
                handleRefresh();
            });
    };

    // const for add direct response

    const addToDirectResponse = () => {
        console.log(Constants.backendUrl);
        fetch(`${Constants.backendUrl}/add-to-direct-response`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "meeting_id": meetingCode, "name": username })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(data.message);
                setMessage(data.message);
                handleRefresh();
            });
    };

    // const for remove from direct response

    const removeFromDirectResponse = () => {
        console.log(Constants.backendUrl);
        fetch(`${Constants.backendUrl}/remove-from-direct-response`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "meeting_id": meetingCode, "name": username })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(data.message);
                setMessage(data.message);
                handleRefresh();
            });
    };


    const handleRefresh = () => {
        setRefresh(!refresh);
    };
    
    return (
        <div>
            <h1>Meeting Stack</h1>
            <h3>You're joining as: {username}</h3>
            <p>Meeting Code: {meetingCode}</p>
            <p>{message !== '' && "Message: " + message}</p>
            <p>Stack: {stack}</p>
            <button onClick={handleRefresh}>Refresh</button>
            <button onClick={() => addToStack()}>Add to Stack</button>
            <button onClick={() => removeFromStack()}>Remove from Stack</button>
            <button onClick={() => addToDirectResponse()}>Add Direct Response</button>
            <button onClick={() => removeFromDirectResponse()}>Remove Direct Response</button>
            <p>Direct Response: {directResponse}</p>

        </div>
    );
}

export default Meeting;
