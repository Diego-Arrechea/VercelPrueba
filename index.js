const express = require("express");
const path = require('path');

const app = express();
// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render(`header.ejs`);
});

app.listen(5000, () => {
    console.log("Running on port http://localhost:5000");
});

// Export the Express API
module.exports = app;