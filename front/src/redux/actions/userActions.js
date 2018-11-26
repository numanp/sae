import axios from 'axios'

const oneUser = (user) => ({
    type:'FETCH_USER',
    user
}) 

// const userAdmin = (userAdmin) => ({
//     type:'MAKE_ADMIN',
//     userAdmin
// }) 

const idSubeChange = (changeSube) => ({
    type: 'CHANGE_SUBE',
    changeSube
})

const newUser = (userCreation) => ({
    type: 'CREATE_USER',
    userCreation
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

