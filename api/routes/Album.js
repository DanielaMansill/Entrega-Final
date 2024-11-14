

const express = require('express');
const Album = require('../models/Album');
const router = express.Router();


// Crear un álbum
router.post('/', async (req, res) => {
    try {
        const nuevoAlbum = new Album({
            Titulo: req.body.Titulo,
            Descripción: req.body.Descripción,
            Año_de_lanzamiento: req.body.Año_de_lanzamiento,
            Agregar_URL: req.body.Agregar_URL,
            canciones: req.body.canciones,
        });

        const albumGuardado = await nuevoAlbum.save();
        res.status(201).json(albumGuardado);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el álbum', error });
    }
});

// Obtener todos los álbumes
router.get('/', async (req, res) => {
    try {
        const result = await Album.find({});
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(404).send('No hay álbumes');
    }
});

router.delete('/', async (req, res) => {
    try {
        const result = await Album.find({});
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(404).send('No hay álbumes');
    }
});

router.get('/detalles/:titulo', async (req, res) => {
    try {
        const album = await Album.findOne({ Titulo: req.params.titulo });

        if (album) {
            res.render('detallesAlbum', { album });
        } else {
            res.status(404).send('Álbum no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al obtener el álbum');
    }
});

// Obtener un álbum por título


router.get('/:titulo', async (req, res) => {
    try {
        const album = await Album.findOne({ Titulo: req.params.titulo });
        if (album) {
            res.status(200).json(album);
        } else {
            res.status(404).json({ message: 'Álbum no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Actualizar un álbum
router.put('/:id', async (req, res) => {
    try {
        const albumActualizado = await Album.findByIdAndUpdate(
            req.params.id,
            {
                Titulo: req.body.Titulo,
                Descripción: req.body.Descripción,
                Año_de_lanzamiento: req.body.Año_de_lanzamiento,
                Agregar_URL: req.body.Agregar_URL,
                canciones: req.body.canciones,
            },
            { new: true } 
        );

        if (!albumActualizado) {
            return res.status(404).json({ message: 'Álbum no encontrado' });
        }

        res.status(200).json(albumActualizado);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el álbum', error });
    }
});

router.put('/titulo/:titulo', async (req, res) => {
    try {
        const albumActualizado = await Album.findOneAndUpdate(
            { Titulo: req.params.titulo },
            {
                Titulo: req.body.Titulo,
                Descripción: req.body.Descripción,
                Año_de_lanzamiento: req.body.Año_de_lanzamiento,
                Agregar_URL: req.body.Agregar_URL,
                canciones: req.body.canciones,
            },
            { new: true } // Devuelve el documento actualizado
        );

        if (!albumActualizado) {
            return res.status(404).json({ message: 'Álbum no encontrado' });
        }

        res.status(200).json(albumActualizado);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el álbum', error });
    }
});


// Eliminar un álbum
router.delete('/:id', async (req, res) => {
    try {
        const albumEliminado = await Album.findByIdAndDelete(req.params.id);
        if (!albumEliminado) {
            return res.status(404).json({ message: 'Álbum no encontrado' });
        }
        res.status(200).json({ message: 'Álbum eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el álbum', error });
    }
});


module.exports = router;
