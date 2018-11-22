const express = require('express');
const router = express.Router();
const User = require('../db/models/User');

router.get('/', (req, res) => {
    User.findAll()
    .then(users => res.send(users))
})

router.get('/:userid', (req, res) => {
  User.findById(req.params.userId)
  .then(user => res.send(user))
}) //OK

router.delete('/:userId', (req, res) => {
  User.destroy({ where: { id: req.params.userId } }).then(() => {
    res.status(200).send('OK');
  });
}); //OK

router.put('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.update(req.body, { fields: ['nombre', 'apellido', 'email', 'password', 'dni', 'telefono', 'imgPerfil'] });
    })
    .then(() => {
      res.status(200).send('usuario modificado exitosamente');
    });
});

router.put('/subeId/', (req, res) => {
  User.findById(req.body.userId).then(user =>
    //User.findById(req.params.userId).then(user =>
    user.update({ subeId: req.body.subeId }).then(() => {
      res.status(200).send('sube de usuario modificada ');
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
