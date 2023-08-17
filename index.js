const express = require("express");
const path = require('path');
const utils = require('./utils.js')
const NodeCache = require('node-cache');
const db = require('./public/js/db.js');

const app = express();
// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));


const CacheReciente = new NodeCache({ stdTTL: 3600 });
app.get('/', (req, res) => {
    const cachedData = CacheReciente.get('index');

    if (cachedData) {
        res.render('index', cachedData);
    } else {

        db.obtenerPeliculasIndex(8).then((Peliculas) => {
            const data = {
                HTML_Recent_Movies: utils.generarHTMLPeliculas(Peliculas.recientes, 4),
                HTML_Accion_Movies: utils.generarHTMLPeliculas(Peliculas.accion, 4),
                HTML_Comedia_Movies: utils.generarHTMLPeliculas(Peliculas.comedia, 4)
            };

            CacheReciente.set('index', data);
            res.render('index', data);
        })
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