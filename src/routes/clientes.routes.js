import express from 'express';
import clienteController from '../controllers/clientes.controller.js';

const router = express.Router();

/**
 * Ruta para obtener todos los clientes.
 * GET /clientes
 */
router.get('/', clienteController.getAllClientes);

/**
 * Ruta para obtener un cliente por su ID.
 * GET /clientes/:id
 */
router.get('/:id', clienteController.getClienteById);

/**
 * Ruta para crear un nuevo cliente.
 * POST /clientes
 */
router.post('/', clienteController.createCliente);

/**
 * Ruta para actualizar un cliente existente.
 * PATCH /clientes/:id
 */
router.patch('/:id', clienteController.patchCliente);

/**
 * Ruta para eliminar un cliente por su ID.
 * DELETE /clientes/:id
 */
router.delete('/:id', clienteController.deleteCliente);

export default router;