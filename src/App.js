import React from 'react';
import { MainContent } from './components/MainContent';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Router>
      <header>
        <Navbar/>
      </header>
      <article>
        <MainContent/>
      </article>
    </Router>
  );
}

export default App;