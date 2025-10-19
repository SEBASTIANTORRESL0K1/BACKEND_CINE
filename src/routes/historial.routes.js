
import { Router } from 'express';
import * as historialController from '../controllers/historial.controller.js';

const router = Router();

router.get('/historial', historialController.getHistoriales);
router.get('/historial/:id', historialController.getHistorial);
router.post('/historial', historialController.createHistorial);
router.put('/historial/:id', historialController.updateHistorial);
router.delete('/historial/:id', historialController.deleteHistorial);

export default router;
