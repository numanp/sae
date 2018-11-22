/*
importamos librerias
*/
import { combineReducers } from 'redux';

/* 
importamos archivos nuestros
*/
import usersReducer from './usersReducer';
import horariosReducer from './horariosReducer';


export default combineReducers({
    users: usersReducer,
    horarios: horariosReducer,
  });