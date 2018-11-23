
export default (state={},action)=>{
    switch (action.type) {
        case 'FETCH_DATE_TIME':
            return Object.assign({},state,action.obj)    
        case 'UPDATE_DIAS':            
            return Object.assign({},state,{dias:action.dias})
        case 'UPDATE_DIA_INICIO':
            return Object.assign({},state,{selectedDateInicio:action.diaI})
        case 'UPDATE_DIA_FIN':
            return Object.assign({},state,{selectedDateFin:action.diaF})
        case 'UPDATE_TIME_INICIO':
            return Object.assign({},state,{selectedTimeMin:action.horaI})
        case 'UPDATE_TIME_FIN':
            return Object.assign({},state,{selectedTimeMax:action.horaF})
        default:
            return state;
    }
}