const express = require("express");
const path = require('path');
const utils = require('./utils.js')
//const db = require('./public/js/db.js');
require('dotenv').config(); // Carga las variables de entorno desde .env
const NodeCache = require('node-cache');
const { MongoClient } = require('mongodb');
const mongoURI = process.env.MONGO_URI; // Utiliza la variable de entorno para la URI de MongoDB
const dbName = process.env.DB_NAME; // Utiliza la variable de entorno para el nombre de la base de datos

let db;
async function conectar() {
    try {
        const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
        db = client.db(dbName);
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1); // Salir del proceso con error
    }
}
conectar()

function obtenerConexion() {
    if (!db) {
        throw new Error('La conexión a MongoDB no ha sido establecida. Asegúrate de llamar a conectar() primero.');
    }
    return db;
}

async function obtenerPeliculasIndex(limit) {
    const collection = obtenerConexion().collection('YTS');
    try {
        const PeliculasRecientes = await collection
            .find({})
            .sort({ "_id": -1 })
            .limit(limit)
            .toArray();

        // Obtener los IDs de las películas recientes
        const idsPeliculasRecientes = PeliculasRecientes.map((pelicula) => pelicula._id);

        // Buscar las películas de acción que no estén en la lista de películas recientes
        const PeliculasAccion = await collection
            .find({
                $and: [
                    { genre: "Acción" },
                    { _id: { $nin: idsPeliculasRecientes } },
                    { genre: { $ne: "Documental" } },
                    { genre: { $ne: "Animación" } }
                ]
            })
            .sort({ "_id": -1 })
            .limit(limit)
            .toArray();

        const idsPeliculasAccion = PeliculasAccion.map((pelicula) => pelicula._id)
        const Peliculas_Comedia = await collection
            .find({
                $and: [
                    { genre: "Comedia" },
                    { _id: { $nin: [...idsPeliculasRecientes, ...idsPeliculasAccion] } },
                ]
            })
            .sort({ "_id": -1 })
            .limit(limit)
            .toArray();

        return { 'recientes': PeliculasRecientes, 'accion': PeliculasAccion, "comedia": Peliculas_Comedia };
    } catch (error) {
        console.error('Error al obtener las películas del index:', error);
        throw error;
    }
}

const app = express();
// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));


const CacheReciente = new NodeCache({ stdTTL: 3600 });
app.get('/', (req, res) => {
    const cachedData = CacheReciente.get('index');
    obtenerPeliculasIndex(8).then((Peliculas) => {
        res.send(Peliculas)
    })
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