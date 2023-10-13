import Button from 'react-bootstrap/Button';
import React from 'react';

function JoinMeeting() {
    return(
        <div className="App">
            <h1>To Join a Meeting-in-Progress</h1>
            <p>Enter Meeting Code:</p>
            <input type="text" />
            <br />
            <p>Enter Your Name:</p>
            <input type="text" />
            <br /><br />
            <Button>Join Meeting</Button>
        </div>
    )
}

export default JoinMeeting;