
import { Router } from 'express';
import * as detalleVentaController from '../controllers/detalleVenta.controller.js';

const router = Router();

router.get('/detalle-venta', detalleVentaController.getDetalleVentas);
router.get('/detalle-venta/:id', detalleVentaController.getDetalleVenta);
router.post('/detalle-venta', detalleVentaController.createDetalleVenta);
router.put('/detalle-venta/:id', detalleVentaController.updateDetalleVenta);
router.delete('/detalle-venta/:id', detalleVentaController.deleteDetalleVenta);

export default router;
