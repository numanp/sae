import axios from 'axios';


//action creator para traer todos los logs/histories
const getHistories = logs => ({
    type : 'GET_HISTORIES',
    logs
})
//funcion para dispatchear el action creator y traer con axios los logs de bbdd
export const fetchHistories = userId => dispatch => {
    if(userId){
        axios.get(`/api/logs/${userId}`)
        .then(response=>response.data)
        .then(logs=>dispatch(getHistories(logs))) 
    }else{
        axios.get('/api/logs')
        .then(response=>response.data)
        .then(logs=>dispatch(getHistories(logs)))
    }
   
}