//REQUIREMENTS
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var faker = require('faker');
//MODELS & SYNC

const db = require('./db/index');
db.sync({force : false});


//APP
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(session({ secret: "dogs" }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../front/dist')));
// console.log(path.join(__dirname, '../front/dist'))
// app.use(express.static('../front/dist'));
// app.use(express.static(path.resolve(__dirname,'/../front/dist')));

//ROUTERS
const userRouter = require('./routes/userRouter');
const historyRouter = require('./routes/historyRouter');
const User = require('./db/models/User');
const Horarios = require('./db/models/Horarios');
const History = require('./db/models/Histories')


//ROUTES
app.use('/creador', ()=>{
  User.create({
    nombre : faker.name.firstName(),
    apellido : faker.name.lastName(),
    email : 'numanp_92@hotmail.com',
    password : '12345678',
    dni : 37038970,
    telefono : 47854514,
    imgPerfil : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    levelAccess : 'SuperAdmin',
    subeId : '2A:5H:AJ:E4'
  }).then(user => {
    Horarios.create({
      dias: ['Lunes','Miércoles','Viernes'],
      fechaInicio: 'August 2, 2018',
      fechaFin: 'August 1, 2019',
      horarioMin: '08:37:00',
      horarioMax: '20:27:00',
    })
    .then(horario => {
      user.setHorario(horario);
    })

  })
})
app.use('/droga', (req, res) => {

    // User.findOne({
    //   subeId : '2A:5H:AJ:E4'
    // })
    // .then(user=>{
    //     Horarios.findById(user.horarioId)
    //     .then(horario=>{
    //         console.log('console.loh de horario first at all', horario)
    //         //seteamos lo que traemos de la base de datos
    //         const horaMinima = horario.horarioMax
    //         const horaMaxima = horario.horarioMax
    //         const diasParaComparar = horario.dias
    //         const horaMINArr = horaMinima.split(':');
    //         const horaMAXArr = horaMaxima.split(':');
    //         //seteamos los datos para comparar
    //         const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    //         const options = { year: 'numeric', month: 'long', day: 'numeric' };
    //         const fecha = new Date();
    //         const today = fecha.toLocaleDateString('en-US',options);
    //         const hora = new Date();
    //         const actualyTime = hora.toLocaleTimeString(options)
    //         const dia = new Date();
    //         const nombreDia = dias[dia.getDay()]
    //         var horaActual = [];
    //         horaActual.push(fecha.getHours())
    //         horaActual.push(fecha.getMinutes())    
    //         //seteamos el formato en el que guardariamos la fecha de ingreso
    //         const toSave = today.concat(' ', actualyTime)
    //         console.log(toSave)
    // const fechaInicio = new Date(horario.fechaInicio);
    // const fechaFin = new Date(horario.fechaFin)
    // if(fechaInicio.getTime() <= fecha.getTime() && fechaFin.getTime() >= fecha.getTime()){
    //     if(diasParaComparar.indexOf(nombreDia) != -1) {     
    //         if(horaActual[0] <= horaMAXArr[0] && horaActual[0] >= horaMINArr[0]){
    //             if(horaActual[0] == horaMAXArr[0]){
    //                 if(horaActual[1] < horaMAXArr[1]){
    //                     History.create({
    //                         nombre : user.nombre,
    //                         apellido : user.apellido,
    //                         ingreso : toSave
    //                     }) 
    //                     return console.log('acceso permitido 1')
    //                 }else{
    //                     return console.log('no pasa')
    //                 } 
    //             }
    //             if(horaActual[0] == horaMINArr[0]){
    //                 if(horaActual[1] > horaMINArr[1]) {
    //                     History.create({
    //                         nombre : user.nombre,
    //                         apellido : user.apellido,
    //                         ingreso : toSave
    //                     }) 
    //                     return console.log('retornamos el acceso 2') 
    //                 }else{
    //                     return console.log('no pasa')
    //                 }
    //             }
    //             History.create({
    //                 nombre : user.nombre,
    //                 apellido : user.apellido,
    //                 ingreso : toSave
    //             }) 
    //                 return console.log('retornamos el acceso sin comparar minutos 1')
    //         }else{
    //                 return console.log(`No puedes pasar, tu horario  : ${horaMinima}  a ${horaMaxima}`)
    //         }
    //     }else{
    //         return console.log('no puede pasar, dia no permitido')
    //     }
    // }
    //     }
    //     )
    // })
})
app.use('/api/logs', historyRouter);
app.use('/api/usuarios', userRouter);
app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/index.html'));
});

//PASSPORT
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
function(username, password, done) {
    User.findOne({ where: { email: username }})
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.passHash(password, user.salt) != user.password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
  }
));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = app;

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');