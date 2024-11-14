const express = require('express');  // Llamando a Express
const mongoose = require('mongoose');
require('dotenv').config();  

const url = process.env.DATABASE_URL;
const app = express();
const PORT = process.env.PORT || 4500;  

const router = require('./routes/index.js');
const user = require('./models/User.js');
const album = require('./models/Album.js');
const song = require('./models/song.js');


const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); 


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());  

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


app.use("/health", (req, res) => res.sendStatus(200));

// Rutas
app.use('/', router);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/imagenes', express.static(path.join(__dirname, 'public', 'Imagenes')));

// Conexión a MongoDB
const connectToMongo = async () => {
  try {
    await mongoose.connect(url);
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en puerto ${PORT} y DB conectada`);
    });
  } catch (error) {
    console.log('Error en la conexión a la base de datos:', error);
  }
};

connectToMongo();

