const express = require("express");
const router = express.Router();
const inventarioModel = require("../models/inventario");

/**
 *  @swagger
 *  components:
 *    schemas:
 *      inventario:
 *        type: object
 *        properties:
 *          producto:
 *            type: string
 *            description: Nombre del producto en inventario
 *          stock:
 *            type: intenger
 *            description: Cantidad en stock del producto
 *          color:
 *            type: string
 *            description: Color del producto en inventario
 *          talla:
 *            type: string
 *            description: Talla del producto en inventario
 *        required:
 *          - producto
 *          - stock
 *          - color
 *          - talla
 *        example:
 *          producto: Camiseta
 *          stock: 50
 *          color: Azul
 *          talla: M
 */
//get: Para obtener todo el inventario
router.get("/inventario", (req, res) => {
    inventarioModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({mensaje:error}))
});

/**
 * @swagger
 * /api/inventario:
 *  get:
 *      summary: Muestra todas las ventas 
 *      tags: [inventario]
 *      responses:
 *          200:
 *              description: ventas mostradas correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                      items:
 *                          $ref: '#components/schemas/inventario'
 */
module.exports = router;