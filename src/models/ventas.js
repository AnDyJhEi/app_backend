const mongoose = require("mongoose")

const ventasModel = mongoose.Schema({
       
        cliente:{
            type:String,
            required:true
        },
        products:{
            type: String,
            required: true
        },
        size:{
            type: Number,
            required: true
        },
        price:{
            type:Number,
            required:true
        },
        quantity:{
            type: Number,
            required: true
        },
        date:{
            type: String,
            required: true
        },
        Pay:{
            type:String,
            type:Number,
            required:true
        },
        modality:{
            type:String,
            required:true
        },
        voucher:{
            type:String,
            required:true
        }
})

module.exports = mongoose.model("Ventas", ventasModel);