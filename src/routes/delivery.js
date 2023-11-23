const express = require("express");
const router = express.Router();
const deliveryModel = require("../models/delivery");

/**
 *  @swagger
 *  components:
 *    schemas:
 *      delivery:
 *        type: object
 *        properties:
 *          cliente:
 *            type: string
 *            description: Nombre del cliente
 *          producto:
 *            type: string
 *            description: Nombre del producto
 *          direccion:
 *            type: string
 *            description: Dirección de entrega del pedido
 *          ciudad:
 *            type: string
 *            description: Ciudad del cliente
 *          telefono:
 *            type: intenger
 *            description: Telefono del cliente 
 *          email:
 *            type: string
 *            description: Email del cliente
 *          fecha_entrega:
 *            type: string
 *            description: Fecha de entrega estimada del pedido
 *          estado:
 *            type: string
 *            description: Estado actual del pedido
 *        required:
 *          - cliente
 *          - producto
 *          - direccion
 *          - ciudad
 *          - telefono
 *          - email
 *          - fecha_entrega
 *          - estado
 *        example:
 *          cliente: Juan Perez
 *          producto: Gorra
 *          direccion: Calle 123
 *          ciudad: Lima
 *          telefono: 971262732
 *          email: juan@gmail.com
 *          fecha_entrega: 2023-12-01
 *          estado: Pendiente
 */

//get: Para obtener las ventas 
router.get("/delivery", (req, res) => {
    deliveryModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({mensaje:error}))
});
/**
 * @swagger
 * /api/delivery:
 *  get:
 *      summary: Muestra todas los delivery
 *      tags: [delivery]
 *      responses:
 *          200:
 *              description: ventas mostradas correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                      items:
 *                          $ref: '#components/schemas/delivery'
 */
//getfindOne:obtener venta segun el cliente
router.get("/delivery/:cliente", (req, res) => {
    const {cliente} = req.params;
    deliveryModel.findOne({cliente})
        .then((data) => res.json(data))
        .catch((error) => res.json({mensaje:error}))
});
/**
 * @swagger
 * /api/delivery/{cliente}:
 *  get:
 *      summary: Busqueda de delivery por su cliente
 *      tags: [delivery]
 *      parameters:
 *          - in: path
 *            name: cliente 
 *            schema:
 *              type: string
 *            required: true
 *            description: Nombre del cliente a buscar
 *      responses:
 *          200:
 *              description: Delivery encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          item:
 *                             $ref: '#components/schemas/delivery'
 *          404:
 *              description : El delivery no existe
 * 
 */

// POST: Para crear un nuevo producto
router.post("/delivery", (req, res) => {
    const nuevodelivery = new deliveryModel(req.body);

    nuevodelivery.save()
        .then((data) => res.json({ mensaje: "Objeto guardado", delivery: data }))
        .catch((error) => res.json({ mensaje: error }));
});
/**
 * @swagger
 * /api/delivery:
 *   post:
 *     summary: Crear un nuevo delivery
 *     tags: [delivery]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/delivery'
 *     responses:
 *       200:
 *         description: Delivery creado exitosamente
 *       400:
 *         description: Error al crear el delivery
 */

//put : Actualizar delivery por su estado
router.put("/delivery/:estado", (req, res) => {
    const {estado} = req.params; 
    const {cliente,productos, total} = req.body;
         //Actualiza la delivery en la base de datos 
    deliveryModel.updateOne({estado}, {$set:{cliente,productos, total}})
        .then((data) => res.json({mensaje:"Objeto actualizado"}))
        .catch((error) => res.json({mensaje:error}))
});
/**
 * @swagger
 * /api/delivery/{fecha}:
 *  put:
 *      summary: Actualizar un delivery por la fecha  
 *      tags: [delivery]
 *      parameters:
 *          - in: path
 *            name: cliente 
 *            schemas:
 *              type: string
 *            required: true
 *            description: Fecha de delivery a actualizar
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                  item:
 *                             $ref: '#components/schemas/delivery'
 *      responses:
 *          200:
 *              description: Delivery actualizado
 *          404:
 *              description: Error al actualizar delivery
 */

//delete
router.delete("/delivery/:cliente",(req, res) => {
    const {cliente} = req.params;
    deliveryModel.deleteOne({cliente})
        .then((data) => res.json({mensaje:"Objeto eliminado"}))
        .catch((error) => res.json({mensaje:error}))
});
/**
 * @swagger
 * /api/delivery/{cliente}:
 *  delete:
 *      summary: Eliminar una delivery
 *      tags: [delivery]
 *      parameters:
 *          - in: path
 *            name: cliente 
 *            schemas:
 *              type: string
 *            required: true
 *            description: Nombre del delivery a buscar para eliminar
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                  item:
 *                             $ref: '#components/schemas/delivery'
 *      responses:
 *          200:
 *              description: Delivery eliminada
 *          404:
 *              description: Error de delivery
 */
module.exports = router;