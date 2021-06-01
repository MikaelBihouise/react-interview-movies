import React, {useState, useEffect} from 'react';
import './App.css';
import logo from './images/logo.svg';
import CardMovie from './components/CardMovie';
let movies = require('./components/movies.js');

function App() {

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
    return(<CardMovie  />)
  })

  return (
    <div className="Body">
      <div className="Header">
        <img src={logo} className="logo-top" alt="Logo My Moviz"/>
        <h1>MOVIES </h1>
      </div>
      <div className="content">
        {movieData}
      </div>
    </div>
  );
}


export default App;