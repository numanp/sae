
export default (state={},action)=>{
    switch (action.type) {
        case 'FETCH_DATE_TIME':
            return Object.assign({},state,action.obj)    
        case 'UPDATE_DIAS':            
            return Object.assign({},state,{dias:action.dias})
        default:
            return state;
    }
}