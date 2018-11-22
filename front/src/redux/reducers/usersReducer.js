
export default (state=[],action) => {
    switch (action.type) {
        case 'FETCH_USERS':
<<<<<<< HEAD
            
            return [...state,...action.users]
    
=======
            return [...state,action.users]
        
>>>>>>> 4a2355eb9a4c7c13fd1efdcec5d971ad59fdc935
        default:
            return state;
    }
}