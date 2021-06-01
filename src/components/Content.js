import React, {useState, useEffect} from 'react';
import CardMovie from '../components/CardMovie';
import {connect} from 'react-redux';

let movies = require('../components/movies');

function Content(props) {

    const [movieList, setMovieList] = useState([])

    useEffect(() => {
        async function loadData() {
            const response = await movies;
            let result = response.movies$.then((v) => {setMovieList(v)})
        }
        loadData();
    }, [movieList])

    let movieData =  movieList.map((movie) => {
        return(<CardMovie title={movie.title} likes={movie.likes} dislikes={movie.dislikes} category={movie.category} id={movie.id}/>)
    })

    if(props.id == typeof 1) {
        console.log('HIIII')
        setMovieList(movieList.filter((movie) => movie.id != props.id));
    }


    return (
            <div className="content">
                {movieData}
            </div>
        );
    }

function mapStateToProps(state) {
    return { id: state.dataMovie }
}

export default connect(
    mapStateToProps,
    null
)(Content);