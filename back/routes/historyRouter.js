const router = require('express').Router()
const History = require('../db/models/Histories');
const User = require('../db/models/User'); 

router.get('/', (req, res) => {
    History.findAll()
    .then(response => res.send(response))
})
router.get('/:id', (req, res) => {
    History.findAll({
        where : {
            userId : req.params.id
        }
    })
    .then(response=>res.send(response))
})
router.post('/', (req, res) => {
    //deberiamos usar el id de la sube para traer el usuario para setear el user id en la tabla, hasta entonces, le harcodeo un usuario
    let subeId = '2A:5H:AJ:E4'
    User.findOne({
        subeId
    })
    .then(user=>{
        Horarios.findById(user.horarioId)
            .then(horario=>{
                //seteamos lo que traemos de la base de datos
                const horaMinima = horario.horarioMax
                const horaMaxima = horario.horarioMax
                const diasParaComparar = horario.dias
                const horaMINArr = horaMinima.split(':');
                const horaMAXArr = horaMaxima.split(':');
                //seteamos los datos para comparar
                const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                const fecha = new Date();
                const today = fecha.toLocaleDateString('en-US',options);
                const hora = new Date();
                const actualyTime = hora.toLocaleTimeString(options)
                const dia = new Date();
                const nombreDia = dias[dia.getDay()]
                var horaActual = [];
                horaActual.push(fecha.getHours())
                horaActual.push(fecha.getMinutes())
                //seteamos el formato en el que guardariamos la fecha de ingreso
                const toSave = today.concat(' ', actualyTime)    
                const fechaInicio = new Date(horario.fechaInicio);
                const fechaFin = new Date(horario.fechaFin)
                if(fechaInicio.getTime() <= fecha.getTime() && fechaFin.getTime() >= fecha.getTime()){
                    if(diasParaComparar.indexOf(nombreDia) != -1) {     
                        if(horaActual[0] <= horaMAXArr[0] && horaActual[0] >= horaMINArr[0]){
                            if(horaActual[0] == horaMAXArr[0]){
                                if(horaActual[1] < horaMAXArr[1]){
                                    return History.create({
                                        nombre : user.nombre,
                                        apellido : user.apellido,
                                        ingreso : toSave,
                                        userId : user.id
                                    })
                                }else{
                                    return console.log('no pasa')
                                } 
                            }     
                            if(horaActual[0] == horaMINArr[0]){
                                if(horaActual[1] > horaMINArr[1]) {
                                    return History.create({
                                            nombre : user.nombre,
                                            apellido : user.apellido,
                                            ingreso : toSave,
                                            userId : user.id
                                            }) 
                                }else{
                                    return console.log('no pasa')
                                }
                            }
                            return History.create({
                                nombre : user.nombre,
                                apellido : user.apellido,
                                ingreso : toSave,
                                userId : user.id
                            }) 
                        }else{
                            return console.log(`No puedes pasar, tu horario  : ${horaMinima}  a ${horaMaxima}`)
                        }
  
                    }else{
                        return console.log('no puede pasar, dia no permitido')
                    }
                }
  
            })
      })
})

module.exports = router;