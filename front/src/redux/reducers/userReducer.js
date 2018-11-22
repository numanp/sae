export default (state={},action) => {
    switch (action.type) {

        case 'FETCH_USER':
            return Object.assign({}, state, { user: action.user })
            //[...state,action.user]
        case 'UPDATE_USER':
            return  Object.assign({}, state, { user: action.changeUser });
        case 'DELETE_USER':
            return state.filter(user => user.id !== action.userId);
        case 'MAKE_ADMIN':
            return console.log('LO HIZO ADMIN')
        case 'CHANGE_SUBE':
            return Object.assign({}, state, { user: action.changeSube })
        default:
            return state;
    }
}