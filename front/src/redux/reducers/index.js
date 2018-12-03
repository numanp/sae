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
import HistoriesReducer from './HistoriesReducer';

export default combineReducers({
    users: usersReducer,
    user: userReducer,
    horarios: horariosReducer,
    logs : HistoriesReducer
  });