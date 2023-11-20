import React from 'react';
import { Route,Routes } from 'react-router-dom';
import About from './about';
import JoinMeeting from './joinMeeting';
import NewMeeting from './newMeeting';
import Home from './home';
import Meeting from './meeting';
import './App.css';
import { useContext, createContext } from 'react';

export const NameContext = createContext('debug');

function App() {
  const username = useContext(NameContext);

  return (
    <div className="App">
      <NameContext.Provider value={username}>
      <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/new-meeting" element={<NewMeeting />} />
      <Route path="/join-meeting" element={<JoinMeeting />} />
      <Route path="/about" element={<About />} />
      <Route path="/meeting" element={<Meeting />} />
      
      </Routes>
      </NameContext.Provider>
    </div>
  );
}

export default App;
