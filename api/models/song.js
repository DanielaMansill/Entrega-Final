const mongoose = require('mongoose')




const song = new mongoose.Schema({

    Titulo:{type:String, require:[true, '!Upps, no te olvides de agregar el nombre de tu canción favorita¡']},

    
        
    
    Duración:
    {type: String,
    required: [true, '¡No te olvides de agregar la duración de la canción']
   },

    Agregar_URL:{
        type:String, require:[true, 'Ingresa URL o Link de Youtube'] 
    },
    
    

})



module.exports = mongoose.model('song', song)