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
module.exports = router;