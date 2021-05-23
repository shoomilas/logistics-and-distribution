import React from 'react';
import Navbar from './components/Navbar';

function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <header>
        <Navbar/>
      </header>
      <article>
        <p>Article</p>
      </article>
    </div>
  );
}

export default App;
