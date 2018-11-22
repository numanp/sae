const express = require('express');
const router = express.Router();
const User = require('../db/models/User');

router.get('/', (req, res) => {
    User.findAll()
    .then(users => res.send(users))
})

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



module.exports = router;
