import React from 'react';
import { Route,Routes } from 'react-router-dom';
import About from './about';
import JoinMeeting from './joinMeeting';
import NewMeeting from './newMeeting';
import Home from './home';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/new-meeting" element={<NewMeeting />} />
      <Route path="/join-meeting" element={<JoinMeeting />} />
      <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
