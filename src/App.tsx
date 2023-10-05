import React from 'react';
import './assets/scss/App.scss';
import { Footer } from './components/Footer';
import { useWallet } from './hooks/useWallet';
import { Routes } from './utils/routes';

function App() {

  useWallet();

  return (
    <div className='App'>
      <Routes />
      <Footer />
    </div>
  );
}

export default App;
