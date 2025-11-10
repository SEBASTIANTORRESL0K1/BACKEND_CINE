import express from 'express';
import cinesRoutes from './cines.routes.js';
import salasRoutes from './salas.routes.js';
import asientosRoutes from './asientos.routes.js';
import usuarioRoutes from './usuarios.routes.js';
import membresiasRoutes from './membresias.routes.js'
const router = express.Router();

/**
 * Rutas principales de la aplicación.
 */

// Rutas para la entidad CINES
router.use('/cines', cinesRoutes);
router.use('/salas', salasRoutes);
router.use('/asientos', asientosRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/membresias', membresiasRoutes);
// Puedes agregar más rutas aquí para otras entidades o módulos
// Ejemplo:
// router.use('/otra-entidad', otraEntidadRoutes);

export default router;