const db = require('../index');
const Sequelize = require('sequelize');
const User = require('./User')

const Horarios = db.define('horarios',{
    dias: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
    },
    fechaInicio:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    fechaFin: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    horarioMin: {
        type: Sequelize.TIME,
        allowNull: false
    },
    horarioMax: {
        type: Sequelize.TIME,
        allowNull: false
    }
})
Horarios.belongsTo(User);
module.exports = Horarios