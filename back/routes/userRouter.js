const express = require('express');
const router = express.Router();
const User = require('../db/models/User');
const passport = require('passport')
//se fija si ya hay un usuario loggeado
router.get('/me', (req, res) => {
  req.user ? res.send(req.user) : res.sendStatus(404);
})
//Trae todos los usuarios y los envia en un arreglo
router.get('/', (req, res) => {
    User.findAll()
    .then(users => res.send(users))
})
//crea un usuario y lo envia
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
//trae un usuario especifico
router.get('/:userid', (req, res) => {
  User.findById(req.params.userid)
  .then(user => res.send(user))
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
  console.log(req.body)
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
//quizas haya que eliminarla, cambia el id de la sube de un usuario especifico
router.put('/subeId', (req, res) => {
  User.findById(req.body.userId).then(user =>
    //User.findById(req.params.userId).then(user =>
    user.update({ subeId: req.body.subeId }).then(() => {
      res.status(200).send(subeId, 'sube de usuario modificada ');
    }),
  );
}); 
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
                subeId: req.user.subeId
            }) 
        }
    }
)

module.exports = router;
