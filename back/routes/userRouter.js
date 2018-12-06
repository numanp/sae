const express = require('express');
const router = express.Router();
const User = require('../db/models/User');
const passport = require('passport')
const Horarios = require('../db/models/Horarios')

//se fija si ya hay un usuario loggeado y lo manda si lo hubiere
router.get('/me', (req, res) => {
  req.user ? res.send(req.user) : res.sendStatus(404);
})
//desloguea al usuario logueado
router.get('/logout', (req, res) =>{
  req.logout();
  res.send('Usuario deslogeado');
})
//Trae todos los usuarios y los envia en un arreglo
router.get('/', (req, res) => {
    User.findAll({include:[Horarios]})
    .then(users => res.send(users))
})
router.get('/horario',(req,res) => {  console.log('entrando a buscar horarios',req.query.state)

    User.findByPk(req.query.state)
    .then(usuario => usuario ?    
      Horarios.findByPk(usuario.dataValues.horarioId)
      .then(data => res.send(data))
      : usuario
    )
})
router.put('/horario/update',(req,res) => {
  User.findByPk(req.body.userId)
  .then(usuario => 
    Horarios.findByPk(usuario.dataValues.horarioId)
    .then(horario => 
      horario.update({
        dias:req.body.dateTime.dias,
        fechaInicio: req.body.dateTime.fechaInicio,
        horarioMin: req.body.dateTime.horarioMin,
        fechaFin: req.body.dateTime.fechaFin,
        horarioMax: req.body.dateTime.horarioMax,
      })
      )
  )
})
//crea un usuario y lo envia
router.post('/', (req, res) =>{
  console.log('creando usuario',req.body);
  
  User.create({
    nombre : req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    imgPerfil: req.body.imgPerfil,
    levelAccess: req.body.levelAccess,
    password: req.body.password,
    dni: req.body.dni,
    telefono: req.body.telefono,
    subeId: req.body.subeId,
  })
  .then(user => {
    Horarios.create({
      dias: req.body.dias,
      fechaInicio: req.body.selectedDateInicio,
      fechaFin: req.body.selectedDateFin,
      horarioMin: new Date(req.body.selectedTimeMin).toLocaleTimeString('en-GB'),
      horarioMax: new Date(req.body.selectedTimeMax).toLocaleTimeString('en-GB'),
    })
    .then(horario => {
      user.setHorario(horario);
    })
    .catch((e)=>console.log(e)) 
    res.status(200).send(user)
  })
  .catch(e => res.send(e));
})

//elimina un usuario especifico (id en el query)
router.delete('/', (req, res) => {
  let id = req.query.id
  User.destroy({ where: { id: id } }).then(() => {
    res.status(200).send('usuario borrado');
  });
});
//modifica un usuario especifico. (id en el body)
router.put('/', (req, res) => {
  User.findById(req.body.id)
    .then(user => {
      user.update({
        nombre : req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        imgPerfil: req.body.imgPerfil,
        levelAccess: req.body.levelAccess,
        password: req.body.password,
        dni: req.body.dni,
        telefono: req.body.telefono,
        subeId: req.body.subeId,
        denuncia : req.body.denuncia
      })
    })
    .then(()=>res.sendStatus(200)) 
});

router.get('/subeId', (req, res) => {
  // console.log(req.query)
  User.findOne({ where: { subeId: req.query.inputForm } }).then(user =>
    // console.log(user.dataValues))
    res.send(user))
}); 

//trae un usuario especifico
router.get('/:userid', (req, res) => {
  User.findById(req.params.userid)
  .then(user => res.send(user))
}) 

//quizas haya que eliminarla, cambia el level access de un usuario especifico
router.put('/makeAdmin/:userId', (req, res) => {
  User.findById(req.params.userId).then(user =>
    user.update({ levelAccess: req.body.levelAccess }).then(() => {
      res.status(200).send('usuario admin modificado ');
    }),
  );
}); 
router.post('/login', passport.authenticate('local'), (req, res) => {
  const authenticated = req.isAuthenticated();
        if(authenticated){
            res.send({
                id:req.user.id,
                nombreCompleto : req.user.nombreCompleto,
                nombre: req.user.nombre,
                apellido: req.user.apellido,
                email: req.user.email,
                dni: req.user.dni,
                telefono: req.user.telefono,
                imagenPerfil: req.user.imagenPerfil,
                levelAccess: req.user.levelAccess,
                subeId: req.user.subeId,
                denuncia : req.user.denuncia
            }) 
        }
    }
)
router.put('/denuncia', (req, res) =>{
  User.findOne({
    where : {
      subeId : req.body.subeId
    }
  })
  .then(user => {
    user.update({
      denuncia : true
    })
  })
})
module.exports = router;
