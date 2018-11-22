
export default (state=[],action) => {
    switch (action.type) {
        case 'FETCH_USERS':
            
            return [...state,...action.users]
    
        default:
            return state;
    }
}