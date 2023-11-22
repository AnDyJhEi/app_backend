const express = require("express");
const router = express.Router();
const ventasModel = require("../models/ventas");

/**
 *  @swagger
 *  components:
 *    schemas:
 *        ventas:
 *              type: object
 *              properties:   
 *                  cliente:
 *                      type: String
 *                      description:  Nombre del cliente
 *                  productos:
 *                      type: String
 *                      description:  Productos comprados
 *                  fecha:
 *                      type: string
 *                      description:  Fecha de compra realizada
 *                  total:
 *                      type: intenger
 *                      description:  Total a pagar por la compra
 *              required:
 *                  - cliente
 *                  - productos
 *                  - fecha
 *                  - total
 *              example:
 *                  cliente:  Jose Huaman Diaz
 *                  productos: Gorra
 *                  fecha: 12_12_2013
 *                  total: 100
 */  

//get: Para obtener las ventas 
router.get("/ventas", (req, res) => {
    ventasModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({mensaje:error}))
});
/**
 * @swagger
 * /api/ventas:
 *  get:
 *      summary: Muestra todas las ventas 
 *      tags: [ventas]
 *      responses:
 *          200:
 *              description: ventas mostradas correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                      items:
 *                          $ref: '#components/schemas/ventas'
 */
//getfindOne:obtener venta segun el cliente
router.get("/ventas/:cliente", (req, res) => {
    const {cliente} = req.params;
    ventasModel.findOne({cliente})
        .then((data) => res.json(data))
        .catch((error) => res.json({mensaje:error}))
});
/**
 * @swagger
 * /api/ventas/{cliente}:
 *  get:
 *      summary: Busqueda de venta por su cliente
 *      tags: [ventas]
 *      parameters:
 *          - in: path
 *            name: cliente 
 *            schema:
 *              type: string
 *            required: true
 *            description: Nombre del cliente a buscar
 *      responses:
 *          200:
 *              description: Venta encontrada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          item:
 *                             $ref: '#components/schemas/ventas'
 *          404:
 *              description : La venta no existe
 * 
 */

//post : Crea nueva venta
router.post("/ventas", (req, res) => {
    const venta = ventasModel(req.body);
    console.log(req.body)
    venta.save()
        .then((data) => res.json({mensaje:"Objeto guardado"}))
        .catch((error) => res.json({mensaje:error}))
});
/**
 * @swagger
 * /api/ventas:
 *  post:
 *      summary: Guardar una venta  
 *      tags: [ventas]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                  item:
 *                             $ref: '#components/schemas/ventas'
 *      responses:
 *          200:
 *              description: Venta guardada
 *          404:
 *              description: Error de venta
 */

//put : Actualizar venta por su ID
router.put("/ventas/:fecha", (req, res) => {
    const {fecha} = req.params; 
    const {cliente,productos, total} = req.body;
         //Actualiza la venta en la base de datos 
    ventasModel.updateOne({fecha}, {$set:{cliente,productos, total}})
        .then((data) => res.json({mensaje:"Objeto actualizado"}))
        .catch((error) => res.json({mensaje:error}))
});
/**
 * @swagger
 * /api/ventas/{fecha}:
 *  put:
 *      summary: Actualizar una venta por la fecha  
 *      tags: [ventas]
 *      parameters:
 *          - in: path
 *            name: cliente 
 *            schemas:
 *              type: string
 *            required: true
 *            description: Fecha de la venta a actualizar
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                  item:
 *                             $ref: '#components/schemas/ventas'
 *      responses:
 *          200:
 *              description: Venta actualizada
 *          404:
 *              description: Error al actualizar
 */

//delete
router.delete("/ventas/:cliente",(req, res) => {
    const {cliente} = req.params;
    ventasModel.deleteOne({cliente})
        .then((data) => res.json({mensaje:"Objeto eliminado"}))
        .catch((error) => res.json({mensaje:error}))
});
/**
 * @swagger
 * /api/ventas/{cliente}:
 *  delete:
 *      summary: Eliminar una venta  
 *      tags: [ventas]
 *      parameters:
 *          - in: path
 *            name: cliente 
 *            schemas:
 *              type: string
 *            required: true
 *            description: Nombre del cliente a buscar para eliminar
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                  item:
 *                             $ref: '#components/schemas/ventas'
 *      responses:
 *          200:
 *              description: Venta eliminada
 *          404:
 *              description: Error de venta
 */

module.exports = router;