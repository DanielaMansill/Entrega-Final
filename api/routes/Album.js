const express = require('express');
const Album = require('../models/Album');
const router = express.Router();

// Crear un álbum
router.post('/', async (req, res) => {
    const album = new Album(req.body);
    try {
        const newAlbum = await album.save();
        res.status(201).json(newAlbum);
    } catch (error) {
        res.status(400).json({ message: error.message });
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

// Obtener un álbum por título
router.get('/:id', async (req, res) => {
    try {
        const result = await Album.find({ Titulo: req.params.Titulo });
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(404).send('No hay álbumes');
    }
});
router.get('/:id', async (req, res) => {
    try {
        const result = await Album.find({ Titulo: req.params.Titulo });
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(404).send('No hay álbumes');
    }
});

// Actualizar un álbum
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const nuevosDatos = req.body;
        await Album.findByIdAndUpdate(id, nuevosDatos, { new: true });
        res.status(200).send("Álbum actualizado correctamente.");
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar el álbum, intente nuevamente.');
    }
});

// Eliminar un álbum
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Album.findByIdAndDelete(id);
        res.status(200).send("Álbum eliminado correctamente.");
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar el álbum, intente nuevamente.');
    }
});

module.exports = router;
