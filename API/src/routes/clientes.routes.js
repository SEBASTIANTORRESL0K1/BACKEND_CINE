
import { Router } from 'express';
import * as clientesController from '../controllers/clientes.controller.js';

const router = Router();

router.get('/clientes', clientesController.getClientes);
router.get('/clientes/:id', clientesController.getCliente);
router.post('/clientes', clientesController.createCliente);
router.put('/clientes/:id', clientesController.updateCliente);
router.delete('/clientes/:id', clientesController.deleteCliente);

export default router;
