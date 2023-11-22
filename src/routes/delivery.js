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
 *          direccion:
 *            type: string
 *            description: Dirección de entrega del pedido
 *          venta:
 *            type: number
 *            description: Cantidad de productos en el pedido
 *          fecha_entrega:
 *            type: string
 *            description: Fecha de entrega estimada del pedido
 *          estado:
 *            type: string
 *            description: Estado actual del pedido
 *        required:
 *          - cliente
 *          - direccion
 *          - venta
 *          - fecha_entrega
 *          - estado
 *        example:
 *          cliente: Juan Perez
 *          direccion: Calle 123, Ciudad
 *          venta: 3
 *          fecha_entrega: 2023-12-01
 *          estado: Pendiente
 */
module.exports = router;