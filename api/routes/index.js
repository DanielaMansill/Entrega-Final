const express = require('express');
const router = express.Router();

const albumsRouter = require('./Album');
const songsRouter = require('./song');
const usersRouter = require('./users');


const Album = require('../models/Album');


const app = express()
app.use(express.json())

router.get("/", (req, res)=>{
    res.status(200).send("'Hello World!'")
    console.log(req.body)
    console.log(req.params)
})






// Crear 
router.post('/Album', async (req, res) => {
    
    const album = new Album(req.body);
    try {
      const newAlbum = await album.save();
      res.status(201).json(newAlbum);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
 


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

//-----------------------------------usuarios---------------------------
router.post('/User', async (req, res)=>{
    
    try{
        await User.create(req.body)
        res.status(201).send('Usuarios creado correctamente')

    }catch (error){
        console.log(error)
        res.status(500).send('Error al crear el usuario')

    }
}
),

router.get('/User/:id', async(req, res) => {
    try {
        const userId = req.params.id;

       
        const user = await User.findById(userId).select('-contraseña');

       
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});


router.put('/User/:id' , async(req, res)=>{
    try{
        const user = req.params.id
        const newuserdata = req.body
      await song.findByIdAndUpdate(user, newuserdata, {new: true})
       res.status(200).send("Información actualizados correctamente.")
    } catch(error){
        console.log(error)
        res.status(500).send('Hubo un error al actualizar la información, intente nuevamente.')
    }
})
module.exports = router