import express from 'express';
import dulceriaController from '../controllers/dulceria.controller.js';

const router = express.Router();

router.get('/', dulceriaController.getAll);
router.get('/:id', dulceriaController.getById);
router.post('/', dulceriaController.create);
router.patch('/:id', dulceriaController.patch);
router.delete('/:id', dulceriaController.delete);

export default router;
