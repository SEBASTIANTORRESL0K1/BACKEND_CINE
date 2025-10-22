
import { Router } from 'express';
import * as stockDulceriaCinesController from '../controllers/stockDulceriaCines.controller.js';

const router = Router();

router.get('/stock-dulceria-cines', stockDulceriaCinesController.getStockDulceriaCines);
router.get('/stock-dulceria-cines/:id', stockDulceriaCinesController.getStockDulceriaCine);
router.post('/stock-dulceria-cines', stockDulceriaCinesController.createStockDulceriaCine);
router.put('/stock-dulceria-cines/:id', stockDulceriaCinesController.updateStockDulceriaCine);
router.delete('/stock-dulceria-cines/:id', stockDulceriaCinesController.deleteStockDulceriaCine);

export default router;
