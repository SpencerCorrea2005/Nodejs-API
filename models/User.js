/* Se define el modelo de datos del usuario. 
    En este caso el usuario debe tener un nombre, email y contraseña*/

const mongoose = require('mongoose');

// Metodo constructor
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

// exportar modelo de datos de un usuario
module.exports = mongoose.model('User', userSchema);
