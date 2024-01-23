// Librerias
const express = require('express');
const productRouter = require('./routes/productRoute.js')
const userRouter = require('./routes/userRoute.js')
const cors = require('cors')
require('dotenv').config();

// Traemos la conexion de la base de datos al servidor
require('./config/database');

// Instanciamiento de express
const app = express();

//static
app.use(express.static('public'))

//Middleware

//Servidor entiende en POST ---> JSON
app.use(cors()); //admitimos todos los dominios
app.use(express.json());

// Con esto usamos una router en nuestro servidor
app.use(productRouter);
app.use(userRouter);

// Levantamiento de servidor
app.listen(process.env.PORT, () => {
    console.log(`Servidor conectado en puerto: ${process.env.PORT}`)
})