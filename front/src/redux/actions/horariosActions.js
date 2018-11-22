import axios from 'axios';
const getDateAndTime = (obj)=>({
    type:'FETCH_DATE_TIME',
    obj
})
const nuevosDias = (dias) => ({
    type:'UPDATE_DIAS',
    dias
})

export const fetchDateAndTime = (userId) => (dispatch) => {
    axios.get('/api/usuarios/horario',{params:{state:userId}})
    .then(res=>{
        var a=res.data.fechaInicio           
        var h=res.data.horarioMin
        var f= new Date(a.concat(' ',h))
        var a1=res.data.fechaFin
        var h1=res.data.horarioMax
        var f1= new Date(a1.concat(' ',h1))
        dispatch(getDateAndTime({
            dias:res.data.dias,
            selectedDateInicio:f,
            selectedTimeMin:f,
            selectedDateFin:f1,
            selectedTimeMax:f1
        }))        
        
     } )
}
export const updateDateAndTime = (userId,dateTime) => (dispatch) => {
    
    axios.put('/api/usuarios/horario/update',{userId,dateTime})
    .then(() => dispatch(getDateAndTime(dateTime)))
}
export const updateDias = (dias) => (dispatch) => {
    dispatch(nuevosDias(dias))
}