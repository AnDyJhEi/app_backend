const mongoose = require("mongoose")

const ventasModel = mongoose.Schema({
       
        cliente:{
            type:String,
            required:true
        },
        productos: [
            {
                producto: {
                    type: String,
                    required: true,
                },
                cantidad: {
                    type: Number,
                    required: true,
                },
            }
        ],
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