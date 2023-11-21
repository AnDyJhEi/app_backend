const express = require("express");
const router = express.Router();
const ventasModel = require("../models/ventas");

//get: Para obtener las ventas 
router.get("/ventas", (req, res) => {
    ventasModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({mensaje:error}))
});

//getbyId :obtener venta segun su ID
router.get("/ventas/:id", (req, res) => {
    const {id} = req.params;
    ventasModel.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({mensaje:error}))
});

//post : Crea nueva venta
router.post("/ventas", (req, res) => {
    const venta = ventasModel(req.body);
    console.log(req.body)
    venta.save()
        .then((data) => res.json({mensaje:"Objeto guardado"}))
        .catch((error) => res.json({mensaje:error}))
});

//put : Actualizar venta por su ID
router.put("/ventas/:id", (req, res) => {
    const {id} = req.params; 
    const {cliente,products,size, price, quantity, date,Pay,modality,voucher} = req.body;
         //Actualiza la venta en la base de datos 
    ventasModel.updateOne({_id:id}, {$set:{cliente,products,size, price, quantity, date,Pay,modality,voucher}})
        .then((data) => res.json({mensaje:"Objeto actualizado"}))
        .catch((error) => res.json({mensaje:error}))
});

//delete
router.delete("/ventas/:id",(req, res) => {
    const {id} = req.params;
    ventasModel.deleteOne({_id:id})
        .then((data) => res.json({mensaje:"Objeto eliminado"}))
        .catch((error) => res.json({mensaje:error}))
});

module.exports = router;