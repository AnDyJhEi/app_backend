//llamada de paquetes
const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const ventas = require("./routes/ventas")
const usuarios=require("./routes/usuarios")
const productos=require("./routes/productos")
const inventario=require("./routes/inventario")
const delivery=require("./routes/delivery")
const swaggerUI  = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");


//Configuraciones
const app = express();
const port = process.env.PORT || 4000;

const swaggerConf = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Archivos de DEVILSTREET",
            version: "1.0.0"
        },
        servers:[
            {
                url:"http://localhost:4000"
            }
        ]
    },
    apis: [ ` ${path.join(__dirname, "./routes/*.js")} ` ]
}

//rutas
app.use(express.json());
app.use("/api", ventas);
app.use("/api", usuarios);
//app.use("/api", productos);
//app.use("/api", inventario);
//app.use("/api", delivery);

//route

app.use("/api-doc",swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerConf)))


//ejecución
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {console.log("Conexión realizada con éxito")})
    .catch((error) => {
        console.error("Error de conectar", error);})

app.listen(port, () => {console.log("servidor escuchando en el puerto "+port)})