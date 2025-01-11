
import express from 'express';

import { getUsers, getUserById, createUser, updateUser, deleteUser, loginUser } from '../controllers/userControllers.js';

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/users', getUsers);

// Ruta para obtener un solo usuario por ID
router.get('/users/:id', getUserById);

// Ruta para crear un nuevo usuario
router.post('/users', createUser);

// Ruta para actualizar un usuario por ID
router.put('/users/:id', updateUser);

// Ruta para eliminar un usuario por ID
router.delete('/users/:id', deleteUser);

// Ruta para el login de usuario
router.post('/login', loginUser);

router.get("/",(req,res)=>{
    res.send("la api esta funcionando correctamente")
})
export default router
