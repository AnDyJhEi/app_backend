const express = require("express");
const router = express.Router();
const ventasModel = require("../models/usuarios");
//modelo 
/**
 *  @swagger
 *  components:
 *    schemas:
 *      usuarios:
 *        type: object
 *        properties:
 *          nombre:
 *            type: string
 *            description: Nombre del usuario
 *          apellidos:
 *            type: string
 *            description: Apellidos del usuario
 *          correo:
 *            type: string
 *            description: Correo electrónico del usuario
 *          username:
 *            type: string
 *            description: Nombre de usuario
 *          contraseña:
 *            type: string
 *            description: Contraseña del usuario
 *          dni:
 *            type: integer
 *            description: DNI del usuario
 *        required:
 *          - nombre
 *          - apellidos
 *          - correo
 *          - username
 *          - contraseña
 *          - dni
 *        example:
 *          nombre: Jose
 *          apellidos: Huaman Diaz
 *          correo: jose@gmai.com
 *          username: jose123
 *          contraseña: soyjose123
 *          dni: 12345678
 */

//get: Para obtener los usuarios 
router.get("/usuarios", (req, res) => {
    ventasModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({mensaje:error}))
});
/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [usuarios]
 *     responses:
 *       200:
 *         description: Retorna todos los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/usuarios'
 *       404:
 *         description: No se encontraron usuarios
 */

//getbyId :obtener cuenta con su dni
router.get("/usuarios/:dni", (req, res) => {
    const {dni} = req.params;
    ventasModel.findOne({dni})
        .then((data) => res.json(data))
        .catch((error) => res.json({mensaje:error}))
});
/**
 * @swagger
 * /api/usuarios/{dni}:
 *   get:
 *     summary: Obtener usuario por DNI
 *     tags: [usuarios]
 *     parameters:
 *       - in: path
 *         name: dni
 *         schema:
 *           type: number
 *         required: true
 *         description: DNI del usuario a buscar
 *     responses:
 *       200:
 *         description: Retorna el usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/usuarios'
 *       404:
 *         description: No se encontró usuario con ese DNI
 */

//post : Crea nuevo usuario
router.post("/usuarios", (req, res) => {
    const nuevousuario = new usuarioModel(req.body);
    console.log(req.body)
    nuevousuario.save()
        .then((data) => res.json({mensaje:"Objeto guardado",usuarios:data}))
        .catch((error) => res.json({mensaje:error}))
});

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/usuarios'
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de éxito
 *                 usuario:
 *                   $ref: '#/components/schemas/usuarios'
 *       400:
 *         description: Error al crear el usuario
 */

//put : Actualizar los usuarios por su correo
router.put("/usuarios/:correo", (req, res) => {
    const {correo} = req.params; 
    const {nombre,apellidos,username,contraseña,dni} = req.body;
         //Actualiza la venta en la base de datos 
    ventasModel.updateOne({correo}, {$set:{nombre,apellidos,username,contraseña,dni}})
        .then((data) => res.json({mensaje:"Objeto actualizado"}))
        .catch((error) => res.json({mensaje:error}))
});

/**
 * @swagger
 * /api/usuarios/{correo}:
 *   put:
 *     summary: Actualizar un usuario por correo
 *     tags: [usuarios]
 *     parameters:
 *       - in: path
 *         name: correo
 *         schema:
 *           type: string
 *         required: true
 *         description: Correo del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/usuarios'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de éxito
 *       404:
 *         description: No se encontró usuario con ese correo
 *       400:
 *         description: Error al actualizar el usuario
 */

//delete usuarios por su username
router.delete("/usuarios/:username",(req, res) => {
    const {username} = req.params;
    ventasModel.deleteOne({username})
        .then((data) => res.json({mensaje:"Objeto eliminado"}))
        .catch((error) => res.json({mensaje:error}))
});

/**
 * @swagger
 * /api/usuarios/{username}:
 *   delete:
 *     summary: Eliminar un usuario por username
 *     tags: [usuarios]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de usuario del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de éxito
 *       404:
 *         description: No se encontró usuario con ese username
 *       400:
 *         description: Error al eliminar el usuario
 */

module.exports = router;