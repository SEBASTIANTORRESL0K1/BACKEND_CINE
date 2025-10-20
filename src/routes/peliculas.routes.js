
import { Router } from 'express';
import * as peliculasController from '../controllers/peliculas.controller.js';
import { verificarToken, isAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// Rutas públicas que cualquiera puede ver
router.get('/peliculas', peliculasController.getPeliculas);
router.get('/peliculas/:id', peliculasController.getPelicula);

// Rutas protegidas que solo los administradores pueden usar
router.post('/peliculas', [verificarToken, isAdmin], peliculasController.createPelicula);
router.put('/peliculas/:id', [verificarToken, isAdmin], peliculasController.updatePelicula);
router.delete('/peliculas/:id', [verificarToken, isAdmin], peliculasController.deletePelicula);

export default router;
