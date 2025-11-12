import express from 'express';
import funcionController from '../controllers/funciones.controller.js';

const router = express.Router();

/**
 * Ruta para obtener todas las funciones.
 * GET /funciones
 */
router.get('/', funcionController.getAllFunciones);

/**
 * Ruta para obtener una función por su ID.
 * GET /funciones/:id
 */
router.get('/:id', funcionController.getFuncionById);

/**
 * Ruta para crear una nueva función.
 * POST /funciones
 */
router.post('/', funcionController.createFuncion);

/**
 * Ruta para actualizar una función existente.
 * PATCH /funciones/:id
 */
router.patch('/:id', funcionController.patchFuncion);

/**
 * Ruta para eliminar una función por su ID.
 * DELETE /funciones/:id
 */
router.delete('/:id', funcionController.deleteFuncion);

export default router;