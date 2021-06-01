import React, {useState, useEffect} from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import dataMovie from './reducers/dataMovie';
import Header from './components/Header';
import Content from './components/Content';

let movies = require('./components/movies.js');

const store = createStore(combineReducers({dataMovie}))

function App() {

  const [movieList, setMovieList] = useState([])

  useEffect(() => {
    async function loadData() {
      const response = await movies;
      let result = response.movies$.then((v) => {setMovieList(v)})
    }
    loadData();
  }, [movieList])

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