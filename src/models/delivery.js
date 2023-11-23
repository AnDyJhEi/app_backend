const mongoose = require("mongoose")
const delivery = mongoose.Schema({
       
        cliente:{
            type:String,
            required:true
        },
        producto:{
            type:String,
            required:true
        },
        direccion:{
            type: String,
            required: true
        },
        ciudad:{
            type:String,
            required:true
        },
        telefono:{
            type:Number,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        fecha_entrega:{
            type:String,
            required:true
        },
        estado:{
            type:String,
            required:true
        }
})

module.exports = mongoose.model("delivery",delivery);