import React, { useEffect, useState } from 'react';
import * as Constants from './constants'
import Button from 'react-bootstrap/Button';

function Home() {
    const [numMeetings, setNumMeetings] = useState(0);

    useEffect(() => {
        getMeetings();
    }, []);

    const getMeetings = () => {
        fetch(`${Constants.backendUrl}/get-meeting-count`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(data => {
                setNumMeetings(data.meeting_count);
            });
    };

    return (
        <div>
            <h1>Meeting Stack</h1>
            <p>{numMeetings} meeting(s) are happening now!</p>
            <p>
                <Button href="/new-meeting">Start Meeting</Button>
                <Button href="/join-meeting">Join Meeting</Button>
            </p>
        </div>
    );
}

export default Home;
