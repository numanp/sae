/*
importamos librerias
*/
import { combineReducers } from 'redux';

/* 
importamos archivos nuestros
*/
import usersReducer from './usersReducer';
import userReducer from './userReducer'

export default combineReducers({
    users: usersReducer,
    user: userReducer,
  });