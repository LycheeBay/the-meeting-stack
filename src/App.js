import React from 'react';
import { Route,Routes } from 'react-router-dom';
import About from './about';
import JoinMeeting from './joinMeeting';
import NewMeeting from './newMeeting';
import Home from './home';
import Meeting from './meeting';
import './App.css';
import { useContext, createContext } from 'react';

export const NameContext = createContext('');

function App() {
  return (
    <div className="App">
      <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/new-meeting" element={<NewMeeting />} />
      <Route path="/join-meeting" element={<JoinMeeting />} />
      <Route path="/about" element={<About />} />
      <Route path="/meeting/:username" element={<Meeting />} />
      
      </Routes>
    </div>
  );
}

export default App;
