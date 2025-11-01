import express from 'express';
import salaController from '../controllers/salas.controller.js';

const router = express.Router();

router.get('/', salaController.getAllSalas);

router.get('/:id', salaController.getSalaById);

router.get('/cine/:cineId', salaController.getSalasByCineId);
router.post('/', salaController.createSala);
router.patch('/:id', salaController.patchSala);
router.delete('/:id', salaController.deleteSala);

export default router;