import { verificarToken, isAdmin } from '../middleware/auth.middleware.js';

import { Router } from 'express';
import * as cinesController from '../controllers/cines.controller.js';

const router = Router();

router.get('/cines', cinesController.obtenerTodosLosCines);
router.get('/cines/:id', cinesController.obtenerCinePorId);
router.get('/cines/nombre/:nombre_cine', cinesController.obtenerCinesPorNombre);
router.post('/cines',[verificarToken, isAdmin], cinesController.crearCine);
router.put('/cines/:id',[verificarToken, isAdmin], cinesController.actualizarCine);
router.delete('/cines/:id',[verificarToken, isAdmin], cinesController.eliminarCine);

export default router;
