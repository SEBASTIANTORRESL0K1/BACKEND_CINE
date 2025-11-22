import express from 'express';
import stockDulceriaCinesController from '../controllers/stock_dulceria_cines.controller.js';

const router = express.Router();

router.get('/', stockDulceriaCinesController.getAll);
router.get('/:id', stockDulceriaCinesController.getById);
router.post('/', stockDulceriaCinesController.create);
router.patch('/:id', stockDulceriaCinesController.patch);
router.delete('/:id', stockDulceriaCinesController.delete);

export default router;
