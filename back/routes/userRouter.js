const express = require('express');
const router = express.Router();
const User = require('../db/models/User');
const Horarios = require('../db/models/Horarios')

router.get('/', (req, res) => {//trae todos los usuarios. Falta incluir los datos de los horarios
    User.findAll({include: [Horarios]})
    .then(users =>{ 
        console.log(users);
                
        res.send(users)})
})
<<<<<<< HEAD
router.get('/horario',(req,res) => {
    Horarios.findOne({where:{id:req.query.state}})//aqui tengo que cambiar para que busque por userId
    .then(data=>res.send(data))
})
router.put('/horario/update',(req,res)=>{    
    Horarios.findById(req.body.userId)
    .then(Horario=>Horario.update(req.body.dateTime))
    })
=======

router.post('/', (req, res) =>{
  User.create({
    nombre : req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    password: req.body.password,
    dni: req.body.dni,
    telefono: req.body.telefono,
    subeId: req.body.subeId,
  })
  .then(user => res.send(user))
})


router.get('/:userid', (req, res) => {
  User.findById(req.params.userid)
  .then(user => res.send(user))
}) //OK

router.delete('/', (req, res) => {
  let id = req.query.id
  User.destroy({ where: { id: id } }).then(() => {
    res.status(200).send('usuario borrado');
  });
});

router.put('/', (req, res) => {
  User.findById(req.body.id)
    .then(user => {
      user.update({
        nombre : req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: req.body.password,
        dni: req.body.dni,
        telefono: req.body.telefono,
        subeId: req.body.subeId,
      })
    })
    .then(()=>res.sendStatus(200))
    
});

router.put('/subeId', (req, res) => {
  User.findById(req.body.userId).then(user =>
    //User.findById(req.params.userId).then(user =>
    user.update({ subeId: req.body.subeId }).then(() => {
      res.status(200).send(subeId, 'sube de usuario modificada ');
    }),
  );
}); //OK

router.put('/makeAdmin/:userId', (req, res) => {
    User.findById(req.params.userId).then(user =>
      user.update({ levelAccess: req.body.levelAccess }).then(() => {
        res.status(200).send('usuario admin modificado ');
      }),
    );
  }); //OK



>>>>>>> 4a2355eb9a4c7c13fd1efdcec5d971ad59fdc935
module.exports = router;
