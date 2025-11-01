import express from 'express';
import asientoController from '../controllers/asientos.controller.js';

const router = express.Router();

router.get('/', asientoController.getAllAsientos);
router.get('/sala/:id',asientoController.getAsientosBySalaId);
router.get('/:id', asientoController.getAsientoById);
router.post('/', asientoController.createAsiento);
router.patch('/:id', asientoController.patchAsiento);
router.delete('/:id', asientoController.deleteAsiento);
export default router;