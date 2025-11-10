import express from 'express';
import reservaController from '../controllers/reservas.controller.js';

const router = express.Router();

/**
 * Ruta para obtener todas las reservas.
 * GET /reservas
 */
router.get('/', reservaController.getAllReservas);

/**
 * Ruta para obtener una reserva por su ID.
 * GET /reservas/:id
 */
router.get('/:id', reservaController.getReservaById);

/**
 * Ruta para crear una nueva reserva.
 * POST /reservas
 */
router.post('/', reservaController.createReserva);

/**
 * Ruta para actualizar una reserva existente.
 * PATCH /reservas/:id
 */
router.patch('/:id', reservaController.patchReserva);

/**
 * Ruta para eliminar una reserva por su ID.
 * DELETE /reservas/:id
 */
router.delete('/:id', reservaController.deleteReserva);

export default router;