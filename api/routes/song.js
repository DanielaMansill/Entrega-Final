const express = require('express');
const router = express.Router();
const Song = require('../models/song');

// Crear una canción
router.post('/', async (req, res) => {
    const newSong = new Song(req.body);
    try {
        await newSong.save();
        res.status(201).json({ _id: newSong._id }); // Asegúrate de enviar el _id
    } catch (error) {
        console.log('Error al agregar la canción:', error);
        res.status(500).send('Error al crear la canción.');
    }
});


router.get('/', async (req, res) => {
    try {
        const result = await Song.find({});
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'No hay canciones' });
    }
});

// Obtener una canción por título
router.get('/:titulo', async (req, res) => {
    try {
        const result = await Song.find({ titulo: req.params.titulo });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'No hay canciones con ese título' });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const nuevosDatos = req.body;
        const updatedSong = await Song.findByIdAndUpdate(id, nuevosDatos, { new: true });
        if (updatedSong) {
            res.status(200).json(updatedSong);
        } else {
            res.status(404).json({ message: 'Canción no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al actualizar la canción, intente nuevamente.' });
    }
});

// Eliminar una canción
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log('ID de la canción a eliminar:', id);
        const deletedSong = await Song.findByIdAndDelete(id);
        if (deletedSong) {
            res.status(200).json({ message: "Canción eliminada correctamente." });
        } else {
            res.status(404).json({ message: 'Canción no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al eliminar la canción, intente nuevamente.' });
    }
});


module.exports = router;