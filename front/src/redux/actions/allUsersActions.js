import axios from 'axios'
const allusers = (users) => ({
    type:'FETCH_USERS',
    users
})

export const fetchUsers = () => (dispatch) => {
    axios.get('/api/usuarios')
    .then(res => res.data)
    .then(data => dispatch(allusers(data)))
}