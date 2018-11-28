export default (state=[], action) => {
    switch(action.type){
        case 'GET_HISTORIES':
            return Object.assign([], state, action.logs)
        default: 
            return state;
    }
}