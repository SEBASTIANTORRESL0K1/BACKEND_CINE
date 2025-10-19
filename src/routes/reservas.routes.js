
import { Router } from 'express';
import * as reservasController from '../controllers/reservas.controller.js';

const router = Router();

router.get('/reservas', reservasController.getReservas);
router.get('/reservas/:id', reservasController.getReserva);
router.post('/reservas', reservasController.createReserva);
router.put('/reservas/:id', reservasController.updateReserva);
router.delete('/reservas/:id', reservasController.deleteReserva);

export default router;
