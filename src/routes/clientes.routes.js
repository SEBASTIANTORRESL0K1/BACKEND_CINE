import express from 'express';
import clienteController from '../controllers/clientes.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * Rutas para operaciones relacionadas con clientes.
 */

// Autenticación para Clientes (Sign Up)
// Middleware valida y crea usuario -> Controller crea cliente y responde con token
router.post('/signup', authMiddleware.signUp, clienteController.signUpCliente);

// Obtener todos los clientes
router.get('/', clienteController.getAllClientes);

// Obtener un cliente por su ID
router.get('/:id', clienteController.getClienteById);

// Crear un nuevo cliente (Admin usage, sin auth flow)
router.post('/', clienteController.createCliente);

// Actualizar un cliente existente
router.patch('/:id', clienteController.patchCliente);

// Eliminar un cliente por su ID
router.delete('/:id', clienteController.deleteCliente);

export default router;