import React, { useState, useEffect } from 'react';

function Meeting() {
    const [stack, setStack] = useState([]);
    const [directResponse, setDirectResponse] = useState('');

    useEffect(() => {
        fetch('/api/stack')
            .then(response => response.json())
            .then(data => setStack([data.stack]));

        fetch('/api/direct-response')
            .then(response => response.json())
            .then(data => setDirectResponse(data.directResponse));
    }, []);

    const addToStack = (item) => {
        fetch('/api/stack', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ item })
        })
            .then(response => response.json())
            .then(data => setStack([data.stack]));
    };

    const removeFromStack = (index) => {
        fetch(`/api/stack/${index}`, {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => setStack(data.stack));
    };

    return (
        <div>
            <h1>Meeting Stack</h1>
            <h2>Direct Response: {directResponse}</h2>
            <ul>
                {stack.map((item, index) => (
                    <li key={index}>{item} <button onClick={() => removeFromStack(index)}>Remove</button></li>
                ))}
            </ul>
            <form onSubmit={(event) => {
                event.preventDefault();
                const item = event.target.elements.item.value;
                addToStack(item);
                event.target.reset();
            }}>
                <label>
                    Add to Stack:
                    <input type="text" name="item" />
                </label>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default Meeting;
