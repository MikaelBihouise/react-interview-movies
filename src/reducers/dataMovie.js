export default function(id = '', action){
    if(action.type === 'deleteItem'){
        return action.id;
    } else {
        return id;
    }
}