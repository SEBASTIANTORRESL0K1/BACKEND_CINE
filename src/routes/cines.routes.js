import express from 'express';
import cineController from '../controllers/cine.controller.js';

const router = express.Router();

/**
 * Ruta para obtener todos los cines.
 * GET /cines
 */
router.get('/', cineController.getAllCines);

/**
 * Ruta para obtener un cine por su ID.
 * GET /cines/:id
 */
router.get('/:id', cineController.getCineById);

/**
 * Ruta para buscar cines por nombre.
 * GET /cines/search?nombre=<nombre>
 */
router.get('/search', cineController.getCinesByName);

/**
 * Ruta para crear un nuevo cine.
 * POST /cines
 */
router.post('/', cineController.createCine);

/**
 * Ruta para actualizar un cine existente.
 * PATCH /cines/:id
 */
router.patch('/:id', cineController.updateCine);

/**
 * Ruta para eliminar un cine.
 * DELETE /cines/:id
 */
router.delete('/:id', cineController.deleteCine);

export default router;