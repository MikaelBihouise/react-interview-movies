import React, {useEffect, useState} from 'react';
import CardMovie from '../components/CardMovie';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';

let movies = require('../components/movies');

function Content(props) {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(12);
    const [itemsPerPageHold, setitemsPerPageHold] = useState(12);

    const [pageNumberLimit, setpageNumberLimit] = useState(3);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const [filtre, setFiltre] = useState(false);
    const [nouvelleListeFilm, setNouvelleListeFilm] = useState([]);

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
        return(<CardMovie isLiked={movie.isLiked} isDisliked={movie.isDisliked} title={movie.title} likes={movie.likes} dislikes={movie.dislikes} category={movie.category} id={movie.id} img={movie.img} />);
    });

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

    const filtreFilm = [];
    const initialFilter = [...props.id];

    const categoryFilm = initialFilter.map((movie) => {
        filtreFilm.push({id: movie.category, label: movie.category});
    });

    const labelFilm = filtreFilm.filter((value,index,array)=>array.findIndex(movie=>(movie.id === value.id && movie.label===value.label))===index);
    
    const newLabelFilm = labelFilm.push({id: 'Aucune', label: 'Aucune'});

    const handleChange = (e) => {
        setitemsPerPage(e.value);
        setitemsPerPageHold(e.value);
        if(movieData.length < e.value && e.value === 12) {
            setCurrentPage(1)
        } else if(movieData.length < e.value && e.value === 8){
            setCurrentPage(2)
        }
    }

    const handleChangeFiltre = (e) => {
        if(e.id === 'Aucune'){
            let resetFilter = props.id.filter(movie => movie.category != e.id);
            setNouvelleListeFilm(resetFilter);
            setitemsPerPage(resetFilter.length);
        } else {
            let filterItems = props.id.filter(movie => movie.category == e.id);
            if(filterItems.length > 4) {
                setitemsPerPage(filterItems.length - (filterItems.length - 4));
            } else if((filterItems.length > 8)) {
                setitemsPerPage(filterItems.length - (filterItems.length - 8));
            } else if((filterItems.length > 12)) {
                setitemsPerPage(filterItems.length - (filterItems.length - 12));
            } else {
                setitemsPerPage(filterItems.length);
            }
            setFiltre(true);
            setNouvelleListeFilm(filterItems)
        }
    }

    if(filtre){
        if(nouvelleListeFilm.length < 4) {
            renderPageNumbers[1] = null;
            renderPageNumbers[2] = null;
            movieData = nouvelleListeFilm.map((movie) => {
                return(<CardMovie isLiked={movie.isLiked} isDisliked={movie.isDisliked} title={movie.title} likes={movie.likes} dislikes={movie.dislikes} category={movie.category} id={movie.id} img={movie.img} />);
            });
        } else if (nouvelleListeFilm.length > 4 && nouvelleListeFilm.length < 8 && itemsPerPageHold === 4) {
            renderPageNumbers[2] = null;
            let newMovieData = nouvelleListeFilm.slice(indexOfFirstItem, indexOfLastItem);
            movieData = newMovieData.map((movie) => {
                return(<CardMovie isLiked={movie.isLiked} isDisliked={movie.isDisliked} title={movie.title} likes={movie.likes} dislikes={movie.dislikes} category={movie.category} id={movie.id} img={movie.img} />);
            });
        } else if (nouvelleListeFilm.length > 4 && nouvelleListeFilm.length < 8 ) {
            renderPageNumbers[1] = null;
            renderPageNumbers[2] = null;
            movieData = nouvelleListeFilm.map((movie) => {
                return(<CardMovie isLiked={movie.isLiked} isDisliked={movie.isDisliked} title={movie.title} likes={movie.likes} dislikes={movie.dislikes} category={movie.category} id={movie.id} img={movie.img} />);
            });
        }
    }

    return (
            <div className="content">
                <div className='pagination'>
                    <div className='page-to-show'>
                        <p>Film affichés : </p>
                        <Select 
                            options={filmAffiche}
                            placeholder='12'
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
                    <div className='category-filter'>
                        <p>Choisir la catégorie : </p>
                        <Select 
                            options={labelFilm}
                            placeholder='Catégorie'
                            className='select-filtre'
                            onChange={handleChangeFiltre}
                        />
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