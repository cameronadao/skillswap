import React from 'react';
import OffersList from './components/OffersList';
import './App.css';

function App() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>SkillSwap</h1>
          <p>Plateforme d'échange de compétences</p>
        </header>
        <main>
          <OffersList />
        </main>
      </div>
    );
  }
  
  export default App;