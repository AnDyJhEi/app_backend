const mongoose = require("mongoose")

const delivery = mongoose.Schema({
       
        cliente:{
            type:String,
            required:true
        },
        direccion:{
            type: String,
            type:Number,
            required: true
        },
        venta:{
            type:Number,
            required: true
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