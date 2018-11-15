var db = require('../index');
const Sequelize = require('sequelize');

const History = db.define('history',{
    nombre: {
        type: Sequelize.STRING,
    },
    apellido: {
        type: Sequelize.STRING,
    }
},{
    getterMethods: {
        nombrecompleto() {
            return this.nombre + ' ' + this.apellido
        }
    },
})

module.exports = History;