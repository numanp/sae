const router = require('express').Router()
const History = require('../db/models/Histories');
const User = require('../db/models/User'); 

router.get('/', (req, res) => {
    History.findAll()
    .then(response => res.send(response))
})
router.post('/', (req, res) => {
    //deberiamos usar el id de la sube para traer el usuario para setear el user id en la tabla, hasta entonces, le harcodeo un usuario
    // const subeId = req.body.subeId
    // User.findOne({
    //     where : {
    //         subeId
    //     }
    // })
    // .then(user =>{
    //     History.create({

    //     })
    // })
    // User.findById(1)
    // .then(console.log)
})

module.exports = router;