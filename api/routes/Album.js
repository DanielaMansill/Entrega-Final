const express = require('express');
const Album = require('../models/Album');
const router = express.Router();
//Crear 
router.post('/Album', async (req, res)=>{
    
    try{
        await Album.create(req.body)
        res.status(201).send('Album agregado correctamente')

    }catch (error){
        console.log(error)
        res.status(500).send('Error al crear el album.')

    }
}
);
//Read album
router.get('/Album' , async(req, res)=>{
    try{
       const result = await Album.find({})
       res.status(200).send(result)
    } catch(error){
        console.log(error)
        res.status(404).send('No hay albumes')
    }
})
router.get('/Album/:Titulo' , async(req, res)=>{
    try{
       const result = await Album.find({Titulo: req.params.Titulo})
       res.status(200).send(result)
    } catch(error){
        console.log(error)
        res.status(404).send('No hay albumes')
    }
})
//put
router.put('/Album/:id' , async(req, res)=>{
    try{
        const id = req.params.id
        const nuevosDatos = req.body
      await Album.findByIdAndUpdate(id, nuevosDatos, {new: true})
       res.status(200).send("Album actualizdo correctamente.")
    } catch(error){
        console.log(error)
        res.status(500).send('Hubo un error al actualizar el album, intente nuevamente.')
    }
})
//delete

router.delete('/Album/:id' , async(req, res)=>{
    try{
        const id = req.params.id
       
      await Album.findByIdAndDelete(id)
       res.status(200).send("Album eliminado correctamente.")
    } catch(error){
        console.log(error)
        res.status(500).send('Hubo un error al eliminar el album, intente nuevamente.')
    }
})
module.exports = router;