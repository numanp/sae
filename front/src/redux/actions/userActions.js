import axios from 'axios'

const oneUser = (user) => ({
    type:'FETCH_USER',
    user
}) 

const idSubeChange = (changeSube) => ({
    type: 'CHANGE_SUBE',
    changeSube
})
const newUser = (userCreation) => ({
    type: 'CREATE_USER',
    userCreation
})
//setea el user loggeado como loggedUser en el store
const loggedUser = loggedUser => ({
    type: 'LOGGED_USER',
    loggedUser
})
export const getUser = (userId) => (dispatch) => {
    axios.get(`/api/usuarios/${userId}`)
    .then(res => res.data)
    .then(data => dispatch(oneUser(data)))
} 

export const createUser = (user) => (dispatch) => {
    axios.post('/api/usuarios/', user)
    .then(res => res.data)
    .then(data => dispatch(newUser(data)))
}
export const makeUserAdmin = (userId) => (dispatch) => {
    axios.put(`/api/usuarios/makeAdmin/`,{userId})
    //axios.put(`/api/usuarios/makeAdmin/${userId}`)
    .then(res => res.data)
    .then(data => dispatch(userAdmin(data))
    )
}
export const remplaceIdSube = (userId) => (dispatch) => {
    axios.put(`/api/usuarios/subeId/`, {userId})
    .then(res => res.data)
    .then(data => dispatch(idSubeChange(data)))
}
export const loginUser = (email, password) => dispatch => {
    axios.post('/api/usuarios/login', {email, password})
    .then(res=>res.data)
    .then(user=>dispatch(loggedUser(user)))
    .catch(e=>console.log('entró al catch'))
}