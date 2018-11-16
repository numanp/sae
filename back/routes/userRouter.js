const express = require('express');
const router = express.Router();
const User = require('../db/models/User');

router.get('/', (req, res) => {
    User.findAll()
    .then(users => res.send(users))
})
module.exports = router;
