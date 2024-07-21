/* Configuracion del servidor en node.js
Se importan los modulos express, mongoose y body-parser y se lo atribuye a una constante
de un mismo nombre.
Body-parser es una libreria de Node.js que se usa junto a Express para analizar y 
procesar los datos de solicitudes HTTP, como JSON o datos de formulario */

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoAtlasUri = "mongodb+srv://Spencer2005:Spencer2005@clusterinicial.uur5g5v.mongodb.net/ClusterInicial?retryWrites=true&w=majority";

const app = express();
const port = process.env.PORT || 3000;   //la API se conectara al puerto escogido por defecto (3000) o a algún otro puerto



// Middlewares
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

/* Conexion a MongoDB 
    Este extracto de codigo fue obtenido de: Najim, A. (2020). 
    How to connect to mongoDB Atlas using mongoose. https://stackoverflow.com/questions/43394019/how-to-connect-to-mongodb-atlas-using-mongoose 
    */
    
mongoose.connect(mongoAtlasUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

// Rutas
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Ruta para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// el puerto manda un mensaje a la consola
app.listen(port, () => {
    console.log('Servidor corriendo en el puerto', port);
});
