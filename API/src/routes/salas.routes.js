
import { Router } from 'express';
import * as salasController from '../controllers/salas.controller.js';

const router = Router();

router.get('/salas', salasController.getSalas);
router.get('/salas/:id', salasController.getSala);
router.post('/salas', salasController.createSala);
router.put('/salas/:id', salasController.updateSala);
router.delete('/salas/:id', salasController.deleteSala);

export default router;
