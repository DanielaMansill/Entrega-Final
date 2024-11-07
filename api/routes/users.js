const express = require('express');
const User = require('../models/User');
const router = express.Router();

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


router.put('/User:id' , async(req, res)=>{
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