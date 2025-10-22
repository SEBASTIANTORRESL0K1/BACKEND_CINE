
import { Router } from 'express';
import * as categoriasDulceriaController from '../controllers/categoriasDulceria.controller.js';

const router = Router();

router.get('/categorias-dulceria', categoriasDulceriaController.getCategoriasDulceria);
router.get('/categorias-dulceria/:id', categoriasDulceriaController.getCategoriaDulceria);
router.post('/categorias-dulceria', categoriasDulceriaController.createCategoriaDulceria);
router.put('/categorias-dulceria/:id', categoriasDulceriaController.updateCategoriaDulceria);
router.delete('/categorias-dulceria/:id', categoriasDulceriaController.deleteCategoriaDulceria);

export default router;
