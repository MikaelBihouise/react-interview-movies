import React, {useState, useEffect} from 'react';
import logo from '../images/logo.svg';
import {connect} from 'react-redux';

let movies = require('../components/movies');

function Header(props) {

    const [movieList, setMovieList] = useState([])

    useEffect(() => {
        async function loadData() {
            const response = await movies;
            let result = response.movies$.then((v) => {setMovieList(v)})
            }
        loadData();
    }, [])

    return (
        <div className="Header">
            <img src={logo} className="logo-top" alt="Logo My Moviz"/>
            <h1>MOVIES </h1>
        </div>
    );
}

export default Header;