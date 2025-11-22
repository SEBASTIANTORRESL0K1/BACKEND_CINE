import express from 'express';
import detalleVentaController from '../controllers/detalle_venta.controller.js';

const router = express.Router();

router.get('/', detalleVentaController.getAll);
router.get('/:id', detalleVentaController.getById);
router.post('/', detalleVentaController.create);
router.patch('/:id', detalleVentaController.patch);
router.delete('/:id', detalleVentaController.delete);

export default router;
