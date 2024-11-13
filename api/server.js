const express = require('express') // va a llamar a express en node_modules
const mongoose = require('mongoose');
const dotenv= require('dotenv').config()

const url = process.env.DATABASE_URL
const app = express()
const PORT = process.env.PORT

//const url = 'mongodb+srv://danielamansill29:zcV7oS2j5qiwXaNF@plataforma-disco.v9pgd.mongodb.net/?retryWrites=true&w=majority&appName=Plataforma-Disco';

const router = require('./routes/index.js')
const user = require('./models/User.js')
const album = require('./models/Album.js')
const song = require('./models/song.js')

//requerir la libreria 
const cookieParser = require ('cookie-parser') // CAE EL SERVIDRO
console.log(process.env)


// organizador de la data
app.use(express.json());
app.use(cookieParser()) // CAE EL SERVIDOR


const path = require("path");
app.use(express.static(path.join(__dirname, "public")))

app.use("/health", (req, res) => res.sendStatus(200));

const apiRoutes = require('./routes/index');


// organizador de las rutas
app.use('/' , router);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true })); 


app.use('/imagenes', express.static('C:/Users/danij/OneDrive/Escritorio/Plataforma Disco/BackEnd/api/public/Imagenes'));
const connectToMongo =async ()=>{
    try{
        await mongoose.connect(url)
        app.listen(PORT, ()=>{
            console.log('Servidor escuchando en puerto 4500 y DB conectada')
        });

    }catch(error){
        console.log(error)

    }
    
 
}

connectToMongo()
