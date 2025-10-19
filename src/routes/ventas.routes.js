
import { Router } from 'express';
import * as ventasController from '../controllers/ventas.controller.js';

const router = Router();

router.get('/ventas', ventasController.getVentas);
router.get('/ventas/:id', ventasController.getVenta);
router.post('/ventas', ventasController.createVenta);
router.put('/ventas/:id', ventasController.updateVenta);
router.delete('/ventas/:id', ventasController.deleteVenta);

export default router;
