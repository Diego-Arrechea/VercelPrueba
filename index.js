const express = require("express");
const path = require('path');
const app = express();

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');

// Configuración para servir archivos estáticos (HTML, CSS, JS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
// Middleware para analizar los datos enviados en el cuerpo de la solicitud
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
    // Renderizar la vista 'header.ejs'
    res.render('header.ejs');
});

// Escuchar en el puerto 5000
app.listen(5000, () => {
    console.log("Running on port http://localhost:5000/.");
});
