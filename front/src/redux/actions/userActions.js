import axios from 'axios'

const oneUser = (user) => ({
    type:'FETCH_USER',
    user
}) 
const modificaUsuario = (usuario) => ({
    type:'UPDATE_USER',
    usuario
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
//trae el usuario logueado y lo carga en el store
const setLoggedUser = loggedUser => ({
    type: 'SET_LOGGED_USER',
    loggedUser
})
//desloguea
const endSession = () => ({
    type : 'END_SESSION',
    loggedUser : {}
})
export const getUser = (userId) => (dispatch) => {
    axios.get(`/api/usuarios/${userId}`)
    .then(res => res.data)
    .then(data => dispatch(oneUser(data)))
} 
export const updateUser = (usuario) => (dispatch) => {
    dispatch(modificaUsuario(usuario))
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
    .catch(e=>alert('Ingresaste mal el usuario o contraseña'))
}
export const isLogged = () => dispatch => {
    axios.get('/api/usuarios/me')
    .then(user=>dispatch(setLoggedUser(user.data)))
    .catch(e => console.log(e))
}
export const logOutUser = () => dispatch => {
    axios.get('/api/usuarios/logout')
    .then(nothing => dispatch(endSession()));
}
export const denunciarSUBE = subeId => dispatch => {
    axios.put('/api/usuarios/denuncia', { subeId })
    .then(res=>console.log(res.data))
}