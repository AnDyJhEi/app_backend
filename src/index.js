//llamada de paquetes
const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const ventas = require("./routes/ventas")

//Configuraciones
const app = express();
const port = process.env.PORT || 4000;

//rutas
app.get("/delivery", (req, res) => { res.send("Pagina de prueba secundaria") });
app.get("/ventas", (req, res) => { res.send("Pagina de ventas principal") });
app.get("/inventario", (req, res) => { res.send("Pagina de ventas principal") });
app.get("/producto", (req, res) => { res.send("Pagina de ventas principal") });
app.get("/usuarios", (req, res) => { res.send("Pagina de ventas principal") });

app.use("/api", ventas);

//ejecución
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {console.log("Conexión realizada con éxito")})
    .catch((error) => {
        console.error("Error de conectar", error);})

app.listen(port, () => {console.log("servidor escuchando en el puerto "+port)})