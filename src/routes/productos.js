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
 *                 $ref: '#/components/schemas/productos'
 *       404:
 *         description: No se encontraron productos
 */
// POST: Para crear un nuevo producto
router.post("/productos", (req, res) => {
    const nuevoProducto = new productosModel(req.body);

    nuevoProducto.save()
        .then((data) => res.json({ mensaje: "Objeto guardado", producto: data }))
        .catch((error) => res.json({ mensaje: error }));
});
/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/productos'
 *     responses:
 *       200:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Error al crear el producto
 */
// GET: Para obtener un producto por su nombre
router.get("/productos/:nombre", (req, res) => {
    const { nombre } = req.params;

    productosModel.findOne({ nombre })
        .then((data) => {
            if (data) {
                res.json(data);
            } else {
                res.status(404).json({ mensaje: "Producto no encontrado" });
            }
        })
        .catch((error) => res.json({ mensaje: error }));
});

/**
 * @swagger
 * /api/productos/{nombre}:
 *   get:
 *     summary: Obtener un producto por su nombre
 *     tags: [productos]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del producto a buscar
 *     responses:
 *       200:
 *         description: Retorna el producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/productos'
 *       404:
 *         description: No se encontró producto con ese nombre
 */
// DELETE: Para borrar un producto por su nombre
router.delete("/productos/:nombre", (req, res) => {
    const { nombre } = req.params;

    productosModel.deleteOne({ nombre })
        .then((data) => {
            if (data.deletedCount > 0) {
                res.json({ mensaje: "Producto eliminado exitosamente" });
            } else {
                res.status(404).json({ mensaje: "Producto no encontrado" });
            }
        })
        .catch((error) => res.json({ mensaje: error }));
});

/**
 * @swagger
 * /api/productos/{nombre}:
 *   delete:
 *     summary: Borrar un producto por su nombre
 *     tags: [productos]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del producto a borrar
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: No se encontró producto con ese nombre
 */
module.exports = router;
