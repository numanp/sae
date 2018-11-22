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
router.get('/horario',(req,res) => {
    Horarios.findOne({where:{id:req.query.state}})//aqui tengo que cambiar para que busque por userId
    .then(data=>res.send(data))
})
router.put('/horario/update',(req,res)=>{    
    Horarios.findById(req.body.userId)
    .then(Horario=>Horario.update(req.body.dateTime))
    })
module.exports = router;
