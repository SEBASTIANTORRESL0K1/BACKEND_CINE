import express from 'express';
import categoriaDulceriaController from '../controllers/categoria_dulceria.controller.js';

const router = express.Router();

router.get('/', categoriaDulceriaController.getAll);
router.get('/:id', categoriaDulceriaController.getById);
router.post('/', categoriaDulceriaController.create);
router.patch('/:id', categoriaDulceriaController.patch);
router.delete('/:id', categoriaDulceriaController.delete);

export default router;
