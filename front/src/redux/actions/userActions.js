import axios from 'axios'

const oneUser = (user) => ({
    type:'FETCH_USER',
    user
}) //OK

const changeUser = (changeUser) => ({
    type: 'UPDATE_USER',
    changeUser
})

const userAdmin = (userAdmin) => ({
    type:'MAKE_ADMIN',
    userAdmin
}) //OK

const deleteUser = (deleteUser) => ({
    type: 'DELETE_USER',
    deleteUser
}) //OK

const idSubeChange = (changeSube) => ({
    type: 'CHANGE_SUBE',
    changeSube
})

export const getUser = (userId) => (dispatch) => {
    axios.get(`/api/usuarios/${userId}`)
    .then(res => res.data)
    .then(data => dispatch(oneUser(data)))
}  

export const updateUser = (userId) => (dispatch) => {
    axios.put(`/api/usuarios/${userId}`)
    .then(res => res.data)
    .then(data => dispatch(changeUser(data)))
}

export const makeUserAdmin = (userId) => (dispatch) => {
    axios.put(`/api/usuarios/makeAdmin/`,{userId})
    //axios.put(`/api/usuarios/makeAdmin/${userId}`)
    .then(res => res.data)
    .then(data => dispatch(userAdmin(data))
    )
}

export const remplaceIdSube = (userId) => (dispatch) => {
    axios.put(`/api/usuarios/subeId/${userId}`)
    .then(res => res.data)
    .then(data => dispatch(idSubeChange(data)))
}


export const removeUser = userId => dispatch =>{
  axios
    .delete(`/api/usuarios/${userId}`)
    .then(res => res.data)
    .then(data => dispatch(deleteUser(data)));
}
