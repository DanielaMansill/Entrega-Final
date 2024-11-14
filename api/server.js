if (process.env.NODE_ENV !== 'production') { 
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routes/index.js');
const cors = require('cors');

// Verificación de la variable de entorno DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL no está definido en el archivo .env');
  process.exit(1); 
}

const app = express();
const PORT = process.env.PORT || 4500;  
const url = process.env.DATABASE_URL;

// Configuración de CORS
const corsOptions = {
  origin: 'https://proyecto-daniela-mansilla-p5.onrender.com', // Permitir solo tu dominio
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type'], // Encabezados permitidos
};

// Middleware
app.use(cors(corsOptions)); // Habilitar CORS con las opciones definidas
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/health", (req, res) => res.sendStatus(200));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/', router);
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
