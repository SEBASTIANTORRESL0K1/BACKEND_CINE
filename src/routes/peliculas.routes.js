
import { Router } from 'express';
import * as peliculasController from '../controllers/peliculas.controller.js';

const router = Router();

router.get('/peliculas', peliculasController.getPeliculas);
router.get('/peliculas/:id', peliculasController.getPelicula);
router.post('/peliculas', peliculasController.createPelicula);
router.put('/peliculas/:id', peliculasController.updatePelicula);
router.delete('/peliculas/:id', peliculasController.deletePelicula);

export default router;
