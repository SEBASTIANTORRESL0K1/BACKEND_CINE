import express from 'express';
import empleadosController from '../controllers/empleados.controller.js';

const router = express.Router();

router.get('/', empleadosController.getAll);
router.get('/:id', empleadosController.getById);
router.post('/', empleadosController.create);
router.patch('/:id', empleadosController.patch);
router.delete('/:id', empleadosController.delete);

export default router;
