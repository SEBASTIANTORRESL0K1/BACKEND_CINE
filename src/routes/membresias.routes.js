
import { Router } from 'express';
import * as membresiasController from '../controllers/membresias.controller.js';

const router = Router();

router.get('/membresias', membresiasController.getMembresias);
router.get('/membresias/:id', membresiasController.getMembresia);
router.post('/membresias', membresiasController.createMembresia);
router.put('/membresias/:id', membresiasController.updateMembresia);
router.delete('/membresias/:id', membresiasController.deleteMembresia);

export default router;
