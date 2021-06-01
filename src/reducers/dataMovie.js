export default function(value = '', action){
    console.log(action)
    if(action.type === 'delete'){
        return action.value;
    } else {
        return value;
    }
}