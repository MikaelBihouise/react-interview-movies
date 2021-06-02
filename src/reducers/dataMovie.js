export default function(data = [], action){
    let dataCopy = [...data];
    if(action.type === 'loadMovie'){
        return action.data;
    } else if(action.type === 'deleteItem'){
        return dataCopy.filter(e => e.id !== action.id);
    } else if(action.type === 'likedItem'){
        dataCopy.forEach((e) => {
            if(e.id === action.id){
                e.isLiked = true;
                e.likes += 1;
            }
        });
        return dataCopy;
    } else if(action.type === 'unlikedItem'){
        dataCopy.forEach((e) => {
            if(e.id === action.id){
                e.isLiked = false;
                e.likes -= 1;
            }
        });
        return dataCopy;
    } else if(action.type === 'dislikedItem'){
        dataCopy.forEach((e) => {
            if(e.id === action.id){
                e.isDisliked = true;
                e.dislikes += 1;
            }
        });
        return dataCopy;
    } else if(action.type === 'undislikedItem'){
        dataCopy.forEach((e) => {
            if(e.id === action.id){
                e.isDisliked = false;
                e.dislikes -= 1;
            }
        });
        return dataCopy;
    }else {
        return data;
    } 
}