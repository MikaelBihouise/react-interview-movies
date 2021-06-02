import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import dataMovie from './reducers/dataMovie';
import Header from './components/Header';
import Content from './components/Content';

const store = createStore(combineReducers({dataMovie}))

function App() {

  return (
    <Provider store={store}> 
      <div className="body">
        <Header />
        <Content />
      </div>
    </Provider>
  );
}

export default App;