import React from 'react';
import './App.css';
import Header from './app/Header/Header';
import SideBar from './app/SideBar/SideBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
        <SideBar />
    </div>
  );
}

export default App;
