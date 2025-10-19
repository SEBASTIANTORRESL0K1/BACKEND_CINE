
import { Router } from 'express';
import * as dulceriaController from '../controllers/dulceria.controller.js';

const router = Router();

router.get('/dulceria', dulceriaController.getDulceria);
router.get('/dulceria/:id', dulceriaController.getDulce);
router.post('/dulceria', dulceriaController.createDulce);
router.put('/dulceria/:id', dulceriaController.updateDulce);
router.delete('/dulceria/:id', dulceriaController.deleteDulce);

export default router;
