import express from 'express';
import historialController from '../controllers/historial.controller.js';

const router = express.Router();

router.get('/', historialController.getAll);
router.get('/:id', historialController.getById);
router.post('/', historialController.create);
router.patch('/:id', historialController.patch);
router.delete('/:id', historialController.delete);

export default router;
