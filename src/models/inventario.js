const mongoose = require("mongoose")

const inventario = mongoose.Schema({
       
        producto:{
            type:String,
            required:true
        },
        stock:{
            type: Number,
            required: true
        },
        color:{
            type: String,
            required: true
        },
        talla:{
            type:Number,
            required:true
        }
})

module.exports = mongoose.model("inventario",inventario);