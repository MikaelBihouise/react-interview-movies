import React, {useEffect, useState} from 'react';
import CardMovie from '../components/CardMovie';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';

let movies = require('../components/movies');

function Content(props) {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(4);

    const [pageNumberLimit, setpageNumberLimit] = useState(3);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    useEffect(() => {
        async function loadData() {
            const response = await movies;
            let result = response.movies$.then((v) => {props.loadMovie(v)});
        }
        loadData();
    }, []);

    const handleClick = (e) => {
        setCurrentPage(Number(e.target.id));
    };

    const pages = [];
    for(let i=1; i<=Math.ceil(props.id.length/itemsPerPage); i++) {
        pages.push(i);
    }

    const renderPageNumbers = pages.map(number => {
        if(number < maxPageNumberLimit+1 && number > minPageNumberLimit) {
            return (
                <li 
                    key={number} 
                    id={number} 
                    onClick={handleClick}
                    className={currentPage == number ? 'active' : null}
                >
                    {number}
                </li>
            )
        } else {
            return null;
        }
    });

    const indexOfLastItem = currentPage*itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = props.id.slice(indexOfFirstItem, indexOfLastItem);

    let movieData = currentItems.map((movie) => {
        return(<CardMovie title={movie.title} likes={movie.likes} dislikes={movie.dislikes} category={movie.category} id={movie.id} img={movie.img} />);
    });

    console.log(movieData[0]);

    const handlePrevButton = () => {
        if(currentPage - 1 < 1) {
            setCurrentPage(currentPage);
        } else {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextButton = () => {
        if(currentPage + 1 > pageNumberLimit) {
            setCurrentPage(currentPage);
        } else {
            setCurrentPage(currentPage + 1);
        }
    }

    const filmAffiche = [
        { value: 4, label: 4 },
        { value: 8, label: 8 },
        { value: 12, label: 12 }
    ];

    const handleChange = (e) => {
        setitemsPerPage(e.value);
    }

    return (
            <div className="content">
                <div className='pagination'>
                    <div className='page-to-show'>
                        <p>Film affichés : </p>
                        <Select 
                            options={filmAffiche}
                            placeholder='4'
                            className='select'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='page-number-container'>
                        <ul className='page-numbers'>
                            <li onClick={handlePrevButton}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </li>
                            {renderPageNumbers}
                            <li onClick={handleNextButton}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="content">
                    {movieData}
                </div>
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
    return { id: state.dataMovie }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Content);