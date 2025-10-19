
import { Router } from 'express';
import * as funcionesController from '../controllers/funciones.controller.js';

const router = Router();

router.get('/funciones', funcionesController.getFunciones);
router.get('/funciones/:id', funcionesController.getFuncion);
router.post('/funciones', funcionesController.createFuncion);
router.put('/funciones/:id', funcionesController.updateFuncion);
router.delete('/funciones/:id', funcionesController.deleteFuncion);

export default router;
