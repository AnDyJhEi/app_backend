const mongoose = require("mongoose")

const productos = mongoose.Schema({
       
        nombre:{
            type:String,
            required:true
        },
        precio:{
            type: Number,
            required: true
        },
        tallas:{
            type:[Number],
            required: true
        },
        color:{
            type:String,
            required:true
        },
        categoria:{
            type:String,
            required:true
        },
        inventario:{
            type:Number,
            required:true
        }
})

module.exports = mongoose.model("productos",productos);