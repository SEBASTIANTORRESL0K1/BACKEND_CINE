import express from 'express';
import peliculaController from '../controllers/peliculas.controller.js';

const router = express.Router();

/**
 * Ruta para obtener todas las películas.
 * GET /peliculas
 */
router.get('/', peliculaController.getAllPeliculas);

/**
 * Ruta para obtener una película por su ID.
 * GET /peliculas/:id
 */
router.get('/:id', peliculaController.getPeliculaById);

/**
 * Ruta para crear una nueva película.
 * POST /peliculas
 */
router.post('/', peliculaController.createPelicula);

/**
 * Ruta para actualizar una película existente.
 * PATCH /peliculas/:id
 */
router.patch('/:id', peliculaController.patchPelicula);

/**
 * Ruta para eliminar una película por su ID.
 * DELETE /peliculas/:id
 */
router.delete('/:id', peliculaController.deletePelicula);

export default router;