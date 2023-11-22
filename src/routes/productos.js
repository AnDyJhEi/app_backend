const express = require("express");
const router = express.Router();
const productosModel = require("../models/productos");
/**
 *  @swagger
 *  components:
 *    schemas:
 *      productos:
 *        type: object
 *        properties:
 *          nombre:
 *            type: string
 *            description: Nombre del producto
 *          precio:
 *            type: number
 *            description: Precio del producto
 *          tallas:
 *            type: array
 *            items:
 *              type: number
 *            description: Tallas disponibles del producto
 *          color:
 *            type: string
 *            description: Color del producto
 *          categoria:
 *            type: string
 *            description: Categoría del producto
 *          inventario:
 *            type: number
 *            description: Cantidad en inventario del producto
 *        required:
 *          - nombre
 *          - precio
 *          - tallas
 *          - color
 *          - categoria
 *          - inventario
 *        example:
 *          nombre: Camiseta
 *          precio: 20.99
 *          tallas: [S, M, L]
 *          color: Rojo
 *          categoria: Ropa
 *          inventario: 100
 */
//get: Para obtener los productos
router.get("/productos", (req, res) => {
    productosModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({mensaje:error}))
});

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [productos]
 *     responses:
 *       200:
 *         description: Retorna todos los productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Productos'
 *       404:
 *         description: No se encontraron productos
 */




module.exports = router;
