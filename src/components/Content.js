import React, {useState, useEffect} from 'react';
import CardMovie from '../components/CardMovie';
import {connect} from 'react-redux';

let movies = require('../components/movies');

function Content(props) {

    useEffect(() => {
        async function loadData() {
            const response = await movies;
            let result = response.movies$.then((v) => {props.loadMovie(v)});
        }
        loadData();
    }, []);

    console.log(props.id)

    let movieData = props.id.map((movie) => {
        return(<CardMovie title={movie.title} likes={movie.likes} dislikes={movie.dislikes} category={movie.category} id={movie.id}/>);
    });

    return (
            <div className="content">
                {movieData}
            </div>
        );
    };

function mapDispatchToProps(dispatch){
    return {
        loadMovie: function(dataMovie){
            dispatch(
                { type: 'loadMovie', data: dataMovie },            
            );
        }, 
    }
}

function mapStateToProps(state) {
    console.log(state)
    return { id: state.dataMovie }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Content);