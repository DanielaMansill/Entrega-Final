const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    titulo: { 
        type: String, 
        required: [true, '!Upps, no te olvides de agregar el nombre de tu canción favorita¡'] 
    },
    duracion: { 
        type: String, 
        required: [true, '¡No te olvides de agregar la duración de la canción'] 
    },
    url: { 
        type: String, 
        required: [true, 'Ingresa URL o Link de Youtube'] 
    }
});

module.exports = mongoose.model('Song', songSchema);

