const mongoose = require("mongoose")

const ventasModel = mongoose.Schema({
       
        cliente:{
            type:String,
            required:true
        },
        productos:{
            type: [String],
            required: true
        },
        fecha:{
            type: String,
            required: true
        },
        total:{
            type:String,
            type:Number,
            required:true
        }
})

module.exports = mongoose.model("Ventas", ventasModel);