import React from 'react';
import { MainContent } from './components/MainContent';
import Navbar from './components/Navbar';

function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <header>
        <Navbar/>
      </header>
      <article>
        <MainContent/>
      </article>
    </div>
  );
}

export default App;