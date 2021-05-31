import React, {useState} from 'react';
import './App.css';
import logo from './images/logo.svg';
import CardMovie from './components/CardMovie';

function App() {
  return (
    <div className="Body">
      <div className="Header">
        <img src={logo} className="logo-top" alt="Logo My Moviz"/>
        <h1>MOVIES</h1>
      </div>
      <div className="content">
        <CardMovie/>
      </div>
    </div>
  );
}


export default App;