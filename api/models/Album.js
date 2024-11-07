const mongoose = require('mongoose')


//2. Album Model
// Definí tu modelo para album. Este deberá tener los campos :
// Título
// Descripción
// Año en qué salió a la venta
// Canciones, cada una de las cuales a su vez tendrá título y duración.
// Portada: será una URL , correspondiente a la imagen de la portada del album.


const album = new mongoose.Schema({

    Titulo:{type:String, require:[true, '¡Dale vida al nuevo himno del rock! El nombre del álbum es obligatorio para marcar su historia.']},

    Descripcion:{type:String,require:[true, '¡Cuéntanos sobre el álbum! La descripción es obligatoria.'],

    minLength: [5, '¡La descripción debe tener al menos 5 caracteres!'],
    maxLength: [200, '¡La descripción no puede tener más de 200 caracteres!'],
  },
        
    
    Año_de_lanzamiento:
    {type: Number,
    required: [true, '¡El año de lanzamiento es obligatorio!'],
    validate: {
      validator: function (v) {
        return v > 0; // Verifica que el año sea mayor a 0
      },
      message: '¡El año debe ser mayor a cero!',
    },
    Agregar_URL:{
        type:String, require:[true, 'Ingresa URL o Link de Youtube'] 
    },

    canciones:
        [ { Titulo:{type:String,require:true},
            Duracion:{type:String,require:true},
            Portada:{type:String, require:[true, 'Ingresa URL o Link de Youtube'] },}
           ]
    }
    

})



module.exports = mongoose.model('album', album)

