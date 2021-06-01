import React, {useState, useEffect} from 'react';
import './App.css';
import logo from './images/logo.svg';
import CardMovie from './components/CardMovie';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import dataMovie from './reducers/dataMovie';
let movies = require('./components/movies.js');

const store = createStore(combineReducers({dataMovie}))

function App(props) {

  const [movieList, setMovieList] = useState([])

  useEffect(() => {
    async function loadData() {
      const response = await movies;
      let result = response.movies$.then((v) => {setMovieList(v)})
    }
    loadData();
  }, [])

  let movieData =  movieList.map((movie) => {
    var isLiked = false
    return(<CardMovie title={movie.title} likes={movie.likes} dislikes={movie.dislikes} category={movie.category} id={movie.id}/>)
  })

  return (
    <Provider store={store}> 
      <div className="Body">
        <div className="Header">
          <img src={logo} className="logo-top" alt="Logo My Moviz"/>
          <h1>MOVIES </h1>
        </div>
        <div className="content">
          {movieData}
        </div>
      </div>
    </Provider>
  );
}

export default App;