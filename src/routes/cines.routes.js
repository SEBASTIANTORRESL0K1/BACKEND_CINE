
import { Router } from 'express';
import * as cinesController from '../controllers/cines.controller.js';

const router = Router();

router.get('/cines', cinesController.obtenerTodosLosCines);
router.get('/cines/:id', cinesController.obtenerCinePorId);
router.get('/cines/nombre/:nombre_cine', cinesController.obtenerCinesPorNombre);
router.post('/cines', cinesController.crearCine);
router.put('/cines/:id', cinesController.actualizarCine);
router.delete('/cines/:id', cinesController.eliminarCine);

export default router;
