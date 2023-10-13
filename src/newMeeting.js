import Button from 'react-bootstrap/Button';
import React from 'react';

function NewMeeting() {
    return(
        <div className="App">
            <h1>To Make a New Meeting</h1>
            <p>Enter Meeting Name:</p>
            <input type="text" />
            <br />
            <p>Enter Your Name:</p>
            <input type="text" />
            <br /><br />
            <Button>Start Meeting</Button>
            
        </div>
    )
}

export default NewMeeting;