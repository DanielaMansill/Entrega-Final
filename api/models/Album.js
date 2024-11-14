const mongoose = require('mongoose')


//2. Album Model
// Definí tu modelo para album. Este deberá tener los campos :
// Título
// Descripción
// Año en qué salió a la venta
// Canciones, cada una de las cuales a su vez tendrá título y duración.
// Portada: será una URL , correspondiente a la imagen de la portada del album.


const album = new mongoose.Schema({
  Titulo: {
      type: String,
      require: [true, '¡Dale vida al nuevo himno del rock! El nombre del álbum es obligatorio para marcar su historia.']
  },
  Descripción: {
      type: String,
      require: [true, '¡Cuéntanos sobre el álbum! La descripción es obligatoria.'],
      minLength: [5, '¡La descripción debe tener al menos 5 caracteres!'],
      maxLength: [400, '¡La descripción no puede tener más de 400 caracteres!'],
  },
  Año_de_lanzamiento: {
      type: Number,
      required: [true, '¡El año de lanzamiento es obligatorio!'],
      validate: {
          validator: function (v) {
              return v > 0;
          },
          message: '¡El año debe ser mayor a cero!',
      },
  },
  Agregar_URL: {
      type: String,
      require: [true, 'Ingresa URL o Link de Youtube']
  },
  canciones: [
      {
          Titulo: { type: String, require: true },
          Duracion: { type: String, require: true },
          Portada: { type: String, require: [true, 'Ingresa URL o Link de Youtube'] },
      }
  ],
  Portada: {
    type: String,
    required: false, // Portada opcional
    validate: {
      validator: function (v) {
        // Si se proporciona una URL, validar que sea válida
        if (v) {
          return /^(http|https):\/\/[^ "]+$/.test(v) || /\.(jpg|jpeg|png|gif)$/i.test(v); // Valida URL o archivo local
        }
        return true; // Si no hay portada, se acepta sin validación
      },
      message: '¡La portada debe ser una URL válida o una ruta a un archivo de imagen válido!'
    }
  },
});



module.exports = mongoose.model('album', album)

