const express = require("express");
const path = require('path');
const utils = require('./utils.js')
//const db = require('./public/js/db.js');
require('dotenv').config(); // Carga las variables de entorno desde .env
const NodeCache = require('node-cache');
const { MongoClient } = require('mongodb');
const mongoURI = process.env.MONGO_URI; // Utiliza la variable de entorno para la URI de MongoDB
const dbName = process.env.DB_NAME; // Utiliza la variable de entorno para el nombre de la base de datos

const app = express();
// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));


const CacheReciente = new NodeCache({ stdTTL: 3600 });
app.get('/', (req, res) => {
    const cachedData = CacheReciente.get('index');
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect()
        .then(() => {
            console.log('Conectado a la base de datos');
            const database = client.db(dbName);
            const collection = database.collection('YTS');

            // Realizar una búsqueda general en la colección
            const query = {};
            return collection.find(query).limit(1).toArray();
        })
        .then(result => {
            console.log('Resultados:', result);
            res.json(result)
        })
        .catch(err => {
            console.error('Error:', err);
        })
        .finally(() => {
            // Cerrar la conexión con la base de datos al finalizar
            client.close();
        });
    return
    if (cachedData) {
        res.render('index', cachedData);
    } else {
        const data = {
            HTML_Recent_Movies: "",
            HTML_Accion_Movies: "",
            HTML_Comedia_Movies: ""
        };

        CacheReciente.set('index', data);
        res.render('index', data);
    }

});

// Manejador de errores personalizado
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { mensaje: 'Error en el servidor.' }); // Renderizar la vista de error.ejs
});



app.listen(5000, () => {
    console.log("Running on port http://localhost:5000");
});

// Export the Express API
module.exports = app;