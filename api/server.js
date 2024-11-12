const express = require('express') // va a llamar a express en node_modules
const router = require('./routes/index.js')
const app = express()
const mongoose = require('mongoose');
const url = 'mongodb+srv://danielamansill29:zcV7oS2j5qiwXaNF@plataforma-disco.v9pgd.mongodb.net/?retryWrites=true&w=majority&appName=Plataforma-Disco';
const user = require('./models/User.js')
const album = require('./models/Album.js')
const song = require('./models/song.js')
const bodyParser = require('body-parser');




// organizador de la data
app.use(express.json())

const path = require("path");
app.use(express.static(path.join(__dirname, "public")))

const apiRoutes = require('./routes/index');
app.use('/api', apiRoutes);

// organizador de las rutas
app.use('/' , router);

const connectToMongo =async ()=>{
    try{
        await mongoose.connect(url)
        app.listen(4500, ()=>{
            console.log('Servidor escuchando en puerto 4500 y DB conectada')
        });

    }catch(error){
        console.log(error)

    }
    
 
}

connectToMongo()
