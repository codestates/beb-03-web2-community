import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomeView from './views/Home';
import SignUpView from './views/SignUp';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main
        style={{
          width: '1400px',
          maxWidth: '100%',
          minHeight: '70vh',
          margin: '0 auto',
          padding: '48px 32px',
        }}
      >
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/signup" element={<SignUpView />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
