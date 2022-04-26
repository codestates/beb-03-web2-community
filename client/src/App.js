import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomeView from './views/Home';
import SignUpView from './views/SignUp';
import SignInView from './views/SignIn';
import BoardListView from './views/BoardList';
import BoardCreateView from './views/BoardCreate';
import BoardItemView from './views/BoardItem';

import './App.css';

function App() {
  return (
    <div className="App bg-gradient-to-r from-gray-900 to-gray-500">
      <Header />
      <main
        style={{
          width: '1400px',
          maxWidth: '100%',
          height: '100%',
          minHeight: '86vh',
          margin: '0 auto',
          padding: '48px 32px',
        }}
      >
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/signup" element={<SignUpView />} />
          <Route path="/signin" element={<SignInView />} />
          <Route path="/boardList" element={<BoardListView />} />
          <Route path="/boardCreate" element={<BoardCreateView />} />
          <Route path="/board/:id" element={<BoardItemView />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
