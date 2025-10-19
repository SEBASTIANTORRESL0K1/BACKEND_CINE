
import { Router } from 'express';
import * as empleadosController from '../controllers/empleados.controller.js';

const router = Router();

router.get('/empleados', empleadosController.getEmpleados);
router.get('/empleados/:id', empleadosController.getEmpleado);
router.post('/empleados', empleadosController.createEmpleado);
router.put('/empleados/:id', empleadosController.updateEmpleado);
router.delete('/empleados/:id', empleadosController.deleteEmpleado);

export default router;
