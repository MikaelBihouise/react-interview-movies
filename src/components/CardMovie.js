import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import movie from '../images/img1.jpg';

const CardMovie = () => {

    let colorLike;
    let colorDislike;

    const [likeMovie, setLikeMovie] = useState(false);
    const [dislikeMovie, setDislikeMovie] = useState(false);
    const [valueLike, setvalueLike] = useState(12);
    const [valueDislike, setvalueDislike] = useState(2);
    const [valueProgress, setvalueProgress] = useState(100 - ((valueDislike * 100) / valueLike));

    if(likeMovie == false){
        colorLike = {cursor:'pointer'}
    } else {
        colorLike = {color: '#FF033A', cursor:'pointer'}
    }

    if(dislikeMovie == false){
        colorDislike = {cursor:'pointer', marginLeft: '10px'}
    } else {
        colorDislike = {color: '#FF033A', cursor:'pointer', marginLeft: '10px'}
    }

    let changeLiked = () => {
        if(likeMovie){
            setLikeMovie(false);
            setvalueLike(valueLike - 1);
            setvalueProgress(100 - ((valueDislike * 100) / (valueLike - 1)));
        } else if(likeMovie == false && dislikeMovie == true) {
            setLikeMovie(true);
            setDislikeMovie(false);
            setvalueDislike(valueDislike - 1);
            setvalueLike(valueLike + 1);
            setvalueProgress(100 - (((valueDislike - 1) * 100) / (valueLike + 1)));
        } else {
            setLikeMovie(true);
            setvalueLike(valueLike + 1);
            setvalueProgress(100 - ((valueDislike * 100) / (valueLike + 1)));
        }
    }

    let changeDisliked = () => {
        if(dislikeMovie){
            setDislikeMovie(false);
            setvalueDislike(valueDislike - 1);
            setvalueProgress(100 - (((valueDislike - 1) * 100) / valueLike));
        } else if(dislikeMovie == false && likeMovie == true) {
            setLikeMovie(false);
            setDislikeMovie(true);
            setvalueLike(valueLike - 1);
            setvalueDislike(valueDislike + 1);
            setvalueProgress(100 - (((valueDislike + 1) * 100) / (valueLike - 1)));
        } else {
            setDislikeMovie(true);
            setvalueDislike(valueDislike + 1);
            setvalueProgress(100 - (((valueDislike + 1) * 100) / valueLike));
        }
    }

    return (
    <div className='card-style'>
        <div className='card-image'>
            <img src={movie} alt='Frozen 2 card' />
        </div>
        <div className='card-content'> 
            <p className='card-title'>Movie name</p>
            <p>Catégorie :</p>
            <div className='card-like'>
                <label for="like"><FontAwesomeIcon style={colorLike} icon={faHeart} onClick={() => changeLiked()}/><span>{valueLike}</span><FontAwesomeIcon style={colorDislike} icon={faHeartBroken} onClick={() => changeDisliked()}/><span>{valueDislike}</span></label>
            </div>
            <div className='card-like-bar'>
                <progress id="like" max="100" value={valueProgress}></progress>
            </div>
            <button className='button-1 end'>Supprimé ce film</button>

        </div>
    </div>
    )
};

export default CardMovie;
