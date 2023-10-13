import React from 'react';
import Button from 'react-bootstrap/Button';

function Home() {
    return (
        <div>
            <h1>Meeting Stack</h1>
            <p>5 meetings are happening now!</p>
            <p>
                <Button href="/new-meeting">Start Meeting</Button>
                <Button href="/join-meeting">Join Meeting</Button>
            </p>
        </div>
    );
}

export default Home;
