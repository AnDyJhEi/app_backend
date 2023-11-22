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
 *            type: number
 *            description: Cantidad en stock del producto
 *          color:
 *            type: string
 *            description: Color del producto en inventario
 *          talla:
 *            type: number
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
 *          talla: 3
 */
module.exports = router;