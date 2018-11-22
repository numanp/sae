export default (state={},action) => {
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
        default:
            return state;
    }
}