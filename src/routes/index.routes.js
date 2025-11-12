import express from 'express';
import cinesRoutes from './cines.routes.js';
import salasRoutes from './salas.routes.js';
import asientosRoutes from './asientos.routes.js';
import usuarioRoutes from './usuarios.routes.js';
import membresiasRoutes from './membresias.routes.js'
import clientesRoutes from './clientes.routes.js'
import reservasRoutes from './reservas.routes.js'
import peliculasRoutes from './peliculas.routes.js'
import funcionesRoutes from './funciones.routes.js'
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
router.use('/clientes', clientesRoutes);
router.use('/reservas', reservasRoutes);
router.use('/peliculas',peliculasRoutes)
router.use('/funciones', funcionesRoutes)
// Puedes agregar más rutas aquí para otras entidades o módulos
// Ejemplo:
// router.use('/otra-entidad', otraEntidadRoutes);

export default router;