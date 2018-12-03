import axios from 'axios'

const allusers = (users) => ({
    type:'FETCH_USERS',
    users
})

export const fetchUsers = () => (dispatch) => {
    axios.get('/api/usuarios')
    .then(res => dispatch(allusers(res.data)))
}

