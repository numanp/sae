import axios from 'axios';
const getDateAndTime = (obj)=>({
    type:'FETCH_DATE_TIME',
    obj
})
const nuevosDias = (dias) => ({
    type:'UPDATE_DIAS',
    dias
})
const diaInicio = (diaI) => ({
    type:'UPDATE_DIA_INICIO',
    diaI
})
const diaFin = (diaF) => ({
    type:'UPDATE_DIA_FIN',
    diaF
})
const horaInicio = (horaI) => ({
    type:'UPDATE_TIME_INICIO',
    horaI
})
const horaFin = (horaF) => ({
    type:'UPDATE_TIME_FIN',
    horaF
})

export const fetchDateAndTime = (userId) => (dispatch) => {
    axios.get('/api/usuarios/horario',{params:{state:userId}})
    .then(res=>{
        var a=res.data.fechaInicio           
        var h=res.data.horarioMin
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        var f= new Date(a.concat(' ',h))
        var a1=res.data.fechaFin
        var h1=res.data.horarioMax
        var f1= new Date(a1.concat(' ',h1))
        dispatch(getDateAndTime({
            dias:res.data.dias,
            selectedDateInicio:f.toLocaleDateString('en-US',options),
            selectedTimeMin:'January 1, 2018 '+h,
            selectedDateFin:f1.toLocaleDateString('en-US',options),
            selectedTimeMax:'January 1, 2018 '+h1
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
export const updateDateInicio = (dateI) => (dispatch) => {
    dispatch(diaInicio(dateI));
}
export const updateDateFin = (dateF) => (dispatch) => {
    dispatch(diaFin(dateF));
}
export const updateTimeInicio = (timeI) => (dispatch) => {  
    dispatch(horaInicio('January 1, 2018 '+timeI));
}
export const updateTimeFin = (timeF) => (dispatch) => {
    dispatch(horaFin('January 1, 2018 '+timeF));
}