const express = require("express");

const app = express();

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');

// Configuración para servir archivos estáticos (HTML, CSS, JS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

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
    console.log("Running on port 5000.");
});
