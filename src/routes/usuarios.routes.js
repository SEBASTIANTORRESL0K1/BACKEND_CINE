import express from 'express';
import usuarioController from '../controllers/usuarios.controller.js';

const router = express.Router();

/**
 * Rutas para operaciones relacionadas con usuarios.
 */

// Obtener todos los usuarios
router.get('/', usuarioController.getAllUsuarios);
// Buscar usuarios por nombre, primer apellido y/o segundo apellido
router.get('/search', usuarioController.getUsuariosByName);
router.get('/correo', usuarioController.getUsuarioByEmail);
router.get('/telefono', usuarioController.getUsuarioByPhoneNumber);
// Obtener un usuario por su ID
router.get('/:id', usuarioController.getUsuarioById);

// Crear un nuevo usuario (Admin usage mostly)
router.post('/', usuarioController.createUsuario);

// Actualizar un usuario existente
router.patch('/:id', usuarioController.patchUsuario);

// Eliminar un usuario por su ID
router.delete('/:id', usuarioController.deleteUsuario);

// Autenticación
router.post('/signup', usuarioController.signUp);
router.post('/login', usuarioController.login);

export default router;