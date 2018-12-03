var db = require('../index');
const Sequelize = require('sequelize');
const User = require('./User');

const History = db.define('history', {
    nombre: {
        type: Sequelize.STRING,
    },
    apellido: {
        type: Sequelize.STRING,
    },
    ingreso : {
        type : Sequelize.STRING,
    }
},{
    getterMethods: {
        nombrecompleto() {
            return this.nombre + ' ' + this.apellido
        }
    }
})
User.hasMany(History)
module.exports = History;