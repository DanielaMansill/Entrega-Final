const mongoose = require('mongoose')

// //1. User Model
// Definí tu modelo de usuario. Deberá tener como mínimo los campos:
// Nombre
// Apellido
// Email
// Contraseña
// Favoritos

const user = new mongoose.Schema({
    nombre:{type:String, require:[true, '¡El nombre es obligatorio para unirte a la rebelión del rock!'],
        minLength: [2, 'El nombre debe tener al menos 2 caracteres'],
    },
    Apellidos:{type:String, require:[true, '¡El apellido es obligatorio para completar tu legado rockero!'],
        minLength: [2, 'El nombre debe tener al menos 2 caracteres'],
    },
    email: {
        type: String,
        required: [true, '¡El correo electrónico es obligatorio para unirte al rock!'],
        match: [/\S+@\S+\.\S+/, 'Por favor ingresa un correo electrónico válido'],
        unique: true 
      },
    contraseña:{type:String,require:true},
    favoritos:{type:String},

    
}
)



module.exports = mongoose.model('user', user)