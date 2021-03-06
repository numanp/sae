const initialState = {
    user: {}
}

export default (state=initialState,action) => {
    switch (action.type) {

        case 'FETCH_USER':
            return Object.assign({}, state, { user: action.user })
            //[...state,action.user]
        case 'MAKE_ADMIN':
            return console.log('LO HIZO ADMIN')
        case 'CHANGE_SUBE':
            return Object.assign({}, state, { user: action.changeSube })
        case 'NEW_USER':
            return Object.assign({}, state, { user: action.userCreation })
        case 'NEW_SUBE':
            return Object.assign({},state,{ user:{ subeId:action.sube }})
        case 'UPDATE_USER':
            return Object.assign({}, state, { user: action.usuario })
        case 'LOGGED_USER':
            return Object.assign({}, state, {loggedUser : action.loggedUser})
        case 'SET_LOGGED_USER':
            return Object.assign({}, state, {loggedUser : action.loggedUser})
        case 'END_SESSION':
            return Object.assign({}, state , {loggedUser : action.loggedUser})
        default:
            return state;
    }
}