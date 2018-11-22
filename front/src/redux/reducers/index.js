/*
importamos librerias
*/
import { combineReducers } from 'redux';

/* 
importamos archivos nuestros
*/
import usersReducer from './usersReducer';
<<<<<<< HEAD
import horariosReducer from './horariosReducer';


export default combineReducers({
    users: usersReducer,
    horarios: horariosReducer,
=======
import userReducer from './userReducer'

export default combineReducers({
    users: usersReducer,
    user: userReducer,
>>>>>>> 4a2355eb9a4c7c13fd1efdcec5d971ad59fdc935
  });