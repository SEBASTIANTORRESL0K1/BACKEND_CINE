
import { Router } from 'express';
import * as cinesController from '../controllers/cines.controller.js';

const router = Router();

router.get('/cines', cinesController.getCines);
router.get('/cines/:id', cinesController.getCine);
router.get('/cines/nombre/:nombre_cine', cinesController.obtenerCinesPorNombre);
router.post('/cines', cinesController.createCine);
router.put('/cines/:id', cinesController.updateCine);
router.delete('/cines/:id', cinesController.deleteCine);

export default router;
