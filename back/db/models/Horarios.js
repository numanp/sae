const db = require('../index');
const Sequelize = require('sequelize');


const Horarios = db.define('horarios',{
    dias: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
    },
    fechaInicio:{
        type: Sequelize.STRING,
        allowNull: false
    },
    fechaFin: {
        type: Sequelize.STRING,
        allowNull: false
    },
    horarioMin: {
        type: Sequelize.STRING,
        allowNull: false
    },
    horarioMax: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Horarios