const mongoose = require("mongoose")

const usuarios = mongoose.Schema({
       
        nombre:{
            type:String,
            required:true
        },
        apellidos:{
            type: String,
            required: true
        },
        correo:{
            type: String,
            type:Number,
            required: true
        },
        username:{
            type:String,
            type:Number,
            required:true
        },
        contraseña:{
            type:String,
            type:Number,
            required:true
        },
        dni:{
            type:Number,
            required:true
        }
})

module.exports = mongoose.model("usuarios",usuarios);