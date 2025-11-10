import express from 'express';
import membresiaController from '../controllers/membresias.controller.js';

const router = express.Router();

/**
 * Ruta para obtener todas las membresías.
 * GET /membresias
 */
router.get('/', membresiaController.getAllMembresias);

/**
 * Ruta para buscar una membresía por su ID.
 * GET /membresias/:id
 */
router.get('/:id', membresiaController.getMembresiaById);

/**
 * Ruta para crear una nueva membresía.
 * POST /membresias
 */
router.post('/', membresiaController.createMembresia);

/**
 * Ruta para actualizar una membresía existente.
 * PATCH /membresias/:id
 */
router.patch('/:id', membresiaController.patchMembresia);

/**
 * Ruta para eliminar una membresía por su ID.
 * DELETE /membresias/:id
 */
router.delete('/:id', membresiaController.deleteMembresia);

export default router;