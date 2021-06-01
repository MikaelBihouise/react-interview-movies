import React, {useState, useEffect} from 'react';
import './App.css';
import logo from './images/logo.svg';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import dataMovie from './reducers/dataMovie';
import CardMovie from './components/CardMovie';
import Header from './components/Header';
import Content from './components/Content';

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

  // let movieData =  movieList.map((movie) => {
  //   return(<CardMovie title={movie.title} likes={movie.likes} dislikes={movie.dislikes} category={movie.category} id={movie.id}/>)
  // })

  return (
    <Provider store={store}> 
      <div className="Body">
        <Header />
        <Content />
        {/* <div className="content">
          {movieData}
        </div> */}
      </div>
    </Provider>
  );
}

export default App;