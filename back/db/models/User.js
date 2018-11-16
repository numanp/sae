var crypto = require('crypto')

var db = require('../index');
const Sequelize = require('sequelize');

const User = db.define('user', {
        nombre: {
            type: Sequelize.STRING,
            allowNull : false,
        },
        apellido: {
            type: Sequelize.STRING,
            allowNull : false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull : false,
            validate: {
                isEmail: true,
                isUnique: function(value, next){
                    User.find({
                        where: { email: value },
                    })
                        .then(function(user, error){
                            if (error) return next('Por favor, ingresa los caracteres correctos');
                            if (user) return next('El email ya esta usado');
                            next()
                        })
                        .catch(error => console.log(error))
                },
            },
        },
        password: {
            type: Sequelize.STRING,
            allowNull : false,
            validate: {
                isLongEnough: function (val) {
                    if (val.length < 8) {
                        throw new Error("Por favor ingresa una contraseña mayor a 8 caracteres")
                    }
                }
            },
        },
        salt: {
            type: Sequelize.STRING,
        },
        dni: {
            type: Sequelize.INTEGER,
            allowNull : false,
        },
        telefono: {
            type: Sequelize.INTEGER,
            allowNull : false,

        },
        imgPerfil: {
            type: Sequelize.STRING,
        },
        levelAccess: {
            type: Sequelize.STRING,
        },
        subeId: {
            type: Sequelize.STRING,
            allowNull : false,
        }
    },  {
            getterMethods: {
                nombreCompleto() {
                    return this.nombre + ' ' + this.apellido
            }
        },
})

User.pSalt = function () {
    return crypto.randomBytes(20).toString('hex');
}

User.prototype.passHash = function (password, salt) {
    var pass = crypto.createHmac('sha1', salt).update(password).digest('hex')
    return pass
}

User.hook('beforeCreate', (user, options) => {
    user.salt = User.pSalt();
    user.password = user.passHash(user.password, user.salt)
});

User.prototype.checkPassword = function (password) {
    var pass = crypto.createHmac('sha1', this.salt).update(password).digest('hex')
    if (pass == this.password) return true
    return false
}

module.exports = User