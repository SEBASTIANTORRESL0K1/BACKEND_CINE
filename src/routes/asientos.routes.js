
import { Router } from 'express';
import * as asientosController from '../controllers/asientos.controller.js';

const router = Router();

router.get('/asientos', asientosController.getAsientos);
router.get('/asientos/:id', asientosController.getAsiento);
router.post('/asientos', asientosController.createAsiento);
router.put('/asientos/:id', asientosController.updateAsiento);
router.delete('/asientos/:id', asientosController.deleteAsiento);

export default router;
