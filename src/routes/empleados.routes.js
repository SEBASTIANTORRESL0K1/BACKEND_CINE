import { verificarToken, isAdmin } from '../middleware/auth.middleware.js';

import { Router } from 'express';
import * as empleadosController from '../controllers/empleados.controller.js';

const router = Router();

router.get('/empleados',[verificarToken, isAdmin], empleadosController.getEmpleados);
router.get('/empleados/:id',[verificarToken, isAdmin], empleadosController.getEmpleado);
router.post('/empleados', [verificarToken, isAdmin],empleadosController.createEmpleado);
router.put('/empleados/:id', [verificarToken, isAdmin],empleadosController.updateEmpleado);
router.delete('/empleados/:id', [verificarToken, isAdmin],empleadosController.deleteEmpleado);

export default router;
