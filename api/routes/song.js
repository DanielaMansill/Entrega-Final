const express = require('express');
const Song = require('../models/song.js');
const router = express.Router();

//-------------------------------------CANCIONES---------------------------------------------------------------------------------
//Crear 
router.post('/song', async (req, res)=>{
    
    try{
        await song.create(req.body)
        res.status(201).send('Canción agregada correctamente')

    }catch (error){
        console.log(error)
        res.status(500).send('Error al agregar la canción')

    }
}
);
//Read cancion
router.get('/song' , async(req, res)=>{
    try{
       const result = await song.find({})
       res.status(200).send(result)
    } catch(error){
        console.log(error)
        res.status(404).send('No hay canciones')
    }
})
router.get('/song/:Titulo' , async(req, res)=>{
    try{
       const result = await song.find({Titulo: req.params.Titulo})
       res.status(200).send(result)
    } catch(error){
        console.log(error)
        res.status(404).send('No hay canciones')
    }
})
//put
router.put('/song/:id' , async(req, res)=>{
    try{
        const id = req.params.id
        const nuevosDatos = req.body
      await song.findByIdAndUpdate(id, nuevosDatos, {new: true})
       res.status(200).send("Canción actualizda correctamente.")
    } catch(error){
        console.log(error)
        res.status(500).send('Hubo un error al actualizar la canción, intente nuevamente.')
    }
})
//delete

router.delete('/song/:id' , async(req, res)=>{
    try{
        const id = req.params.id
       
      await song.findByIdAndDelete(id)
       res.status(200).send("Canción  eliminada correctamente.")
    } catch(error){
        console.log(error)
        res.status(500).send('Hubo un error al eliminar la canción, intente nuevamente.')
    }
})
module.exports = router;