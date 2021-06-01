export default function(data = [], action){
    let dataCopy = [...data];
    if(action.type === 'loadMovie'){
        return action.data;
    } else if(action.type === 'deleteItem'){
        return dataCopy.filter(e => e.id != action.id)
    } else {
        return data;
    }
}