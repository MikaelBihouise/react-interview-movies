import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';


const CardMovie = (props) => {

    let colorLike;
    let colorDislike;



    const [likeMovie, setLikeMovie] = useState(props.isLiked);
    const [dislikeMovie, setDislikeMovie] = useState(props.isDisliked);
    const [valueLike, setvalueLike] = useState(props.likes);
    const [valueDislike, setvalueDislike] = useState(props.dislikes);
    const [valueProgress, setvalueProgress] = useState(100 - ((valueDislike * 100) / (valueLike + valueDislike)));

    useEffect(() => {
        setvalueLike(props.likes);
        setvalueDislike(props.dislikes);
        setLikeMovie(props.isLiked);
        setDislikeMovie(props.isDisliked);
    }, [props.likes]);

    console.log(props.isDisliked)


    if(likeMovie === false && props.isLiked === false){
        colorLike = {cursor:'pointer'}
    } else {
        colorLike = {color: '#FF033A', cursor:'pointer'}
    }

    if(dislikeMovie === false && props.isDisliked === false){
        colorDislike = {cursor:'pointer', marginLeft: '10px'}
    } else {
        colorDislike = {color: '#FF033A', cursor:'pointer', marginLeft: '10px'}
    }

    let changeLiked = () => {
        console.log(likeMovie)
        if(props.isLiked){
            props.unlikedItem(props.id);
            setLikeMovie(false);
            setvalueLike(valueLike - 1);
            setvalueProgress(100 - ((valueDislike * 100) / ((valueLike + valueDislike) - 1)));
        } else if(props.isLiked === false && props.isDisliked === true) {
            props.likedItem(props.id);
            props.undislikedItem(props.id);
            setLikeMovie(true);
            setDislikeMovie(false);
            setvalueDislike(valueDislike - 1);
            setvalueLike(valueLike + 1);
            setvalueProgress(100 - (((valueDislike - 1) * 100) / ((valueLike + valueDislike) + 1)));
        } else {
            props.likedItem(props.id);
            setLikeMovie(true);
            setvalueLike(valueLike + 1);
            setvalueProgress(100 - ((valueDislike * 100) / ((valueLike + valueDislike)+ 1)));
        }
    }

    let changeDisliked = () => {
        if(dislikeMovie){
            props.undislikedItem(props.id);
            setDislikeMovie(false);
            setvalueDislike(valueDislike - 1);
            setvalueProgress(100 - (((valueDislike - 1) * 100) / (valueLike + valueDislike - 1)));
        } else if(dislikeMovie === false && likeMovie === true) {
            props.dislikedItem(props.id);
            props.unlikedItem(props.id);
            setLikeMovie(false);
            setDislikeMovie(true);
            setvalueLike(valueLike - 1);
            setvalueDislike(valueDislike + 1);
            setvalueProgress(100 - (((valueDislike + 1) * 100) / ((valueLike + valueDislike))));
        } else {
            props.dislikedItem(props.id);
            setDislikeMovie(true);
            setvalueDislike(valueDislike + 1);
            setvalueProgress(100 - (((valueDislike + 1) * 100) / (valueLike + (valueDislike + 1))));
        }
    }

    return (
    <div className='card-style'>
        <div className='card-image'>
            <img src={process.env.PUBLIC_URL + props.img} alt={'Une image de fond qui représente le film ' + props.title} />
        </div>
        <div className='card-content'> 
            <p className='card-title'>{props.title}</p>
            <p>Catégorie : {props.category}</p>
            <div className='card-like'>
                <label for="like"><FontAwesomeIcon style={colorLike} icon={faHeart} onClick={() => changeLiked()}/><span>{valueLike}</span><FontAwesomeIcon style={colorDislike} icon={faHeartBroken} onClick={() => changeDisliked()}/><span>{valueDislike}</span></label>
            </div>
            <div className='card-like-bar'>
                <progress id="like" max="100" value={valueProgress}></progress>
            </div>
            <button className='button-1 end' onClick={ ()=>props.deleteItem(props.id)}>Supprimé ce film</button>
        </div>
    </div>
    )
};

function mapDispatchToProps(dispatch){
    return {
        deleteItem: function(id){
            dispatch(
                { type: 'deleteItem', id: id }        
            );
        }, 
        likedItem: function(id){
            dispatch(
                { type: 'likedItem', id: id },        
            );
        },
        unlikedItem: function(id){
            dispatch(
                { type: 'unlikedItem', id: id },        
            );
        },
        dislikedItem: function(id){
            dispatch(
                { type: 'dislikedItem', id: id },        
            );
        },
        undislikedItem: function(id){
            dispatch(
                { type: 'undislikedItem', id: id },        
            );
        }, 
    }
}

export default connect(
    null,
    mapDispatchToProps
)(CardMovie);