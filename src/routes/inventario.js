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
 *          talla: 16
 */

// Mostrar todos los productos en inventario
router.get("/inventario", (req, res) => {
    inventarioModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ mensaje: error }));
});

/**
 * @swagger
 * /api/inventario:
 *   get:
 *     summary: Muestra todos los productos en inventario
 *     tags: [inventario]
 *     responses:
 *       200:
 *         description: Productos en inventario mostrados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/inventario'
 */

// Buscar un producto en inventario por nombre
router.get("/inventario/:producto", (req, res) => {
    const { producto } = req.params;
    inventarioModel.findOne({ producto })
        .then((data) => res.json(data))
        .catch((error) => res.json({ mensaje: error }));
});

/**
 * @swagger
 * /api/inventario/{producto}:
 *   get:
 *     summary: Buscar un producto en inventario por nombre
 *     tags: [inventario]
 *     parameters:
 *       - in: path
 *         name: producto
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del producto a buscar
 *     responses:
 *       200:
 *         description: Producto encontrado en inventario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/inventario'
 *       404:
 *         description: El producto no existe en inventario
 */

// Actualizar un producto en inventario por nombre
router.put("/inventario/:producto", (req, res) => {
    const { producto } = req.params;
    const { stock, color, talla } = req.body;

    inventarioModel.updateOne({ producto }, { $set: { stock, color, talla } })
        .then((data) => res.json({ mensaje: "Producto actualizado" }))
        .catch((error) => res.json({ mensaje: error }));
});

/**
 * @swagger
 * /api/inventario/{producto}:
 *   put:
 *     summary: Actualizar un producto en inventario por nombre
 *     tags: [inventario]
 *     parameters:
 *       - in: path
 *         name: producto
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#components/schemas/inventario'
 *     responses:
 *       200:
 *         description: Producto en inventario actualizado
 *       404:
 *         description: Error al actualizar el producto en inventario
 */

// Crear un nuevo producto en inventario
router.post("/inventario", (req, res) => {
    const nuevoProducto = new inventarioModel(req.body);

    nuevoProducto.save()
        .then((data) => res.json({ mensaje: "Producto guardado", inventario: data }))
        .catch((error) => res.json({ mensaje: error }));
});

/**
 * @swagger
 * /api/inventario:
 *   post:
 *     summary: Crear un nuevo producto en inventario
 *     tags: [inventario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/inventario'
 *     responses:
 *       200:
 *         description: Producto en inventario creado exitosamente
 *       400:
 *         description: Error al crear el producto en inventario
 */

// Eliminar un producto en inventario por nombre
router.delete("/inventario/:producto", (req, res) => {
    const { producto } = req.params;
    inventarioModel.deleteOne({ producto })
        .then((data) => res.json({ mensaje: "Producto eliminado" }))
        .catch((error) => res.json({ mensaje: error }));
});

/**
 * @swagger
 * /api/inventario/{producto}:
 *   delete:
 *     summary: Eliminar un producto en inventario por nombre
 *     tags: [inventario]
 *     parameters:
 *       - in: path
 *         name: producto
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto en inventario eliminado
 *       404:
 *         description: Error al eliminar el producto en inventario
 */

module.exports = router;