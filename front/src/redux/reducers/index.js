/*
importamos librerias
*/
import { combineReducers } from 'redux';

/* 
importamos archivos nuestros
*/
import usersReducer from './usersReducer';
import userReducer from './userReducer';
import horariosReducer from './horariosReducer';

export default combineReducers({
    users: usersReducer,
    user: userReducer,
    horarios: horariosReducer,
  });