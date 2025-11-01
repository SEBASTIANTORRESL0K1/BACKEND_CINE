import express from 'express';
import cineController from '../controllers/cines.controller.js';

const router = express.Router();

/**
 * Ruta para obtener todos los cines.
 * GET /cines
 */
router.get('/', cineController.getAllCines);

/**
 * Ruta para buscar cines por nombre.
 * GET /cines/search?nombre=<nombre>
 */
router.get('/search', cineController.getCinesByName);

/**
 * Ruta para obtener un cine por su ID.
 * GET /cines/:id
 */
router.get('/:id', cineController.getCineById);

/**
 * Ruta para crear un nuevo cine.
 * POST /cines
 */
router.post('/', cineController.createCine);

/**
 * Ruta para actualizar un cine existente.
 * PATCH /cines/:id
 */
router.patch('/:id', cineController.patchCine);

/**
 * Ruta para eliminar un cine.
 * DELETE /cines/:id
 */
router.delete('/:id', cineController.deleteCine);

export default router;