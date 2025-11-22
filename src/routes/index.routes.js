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
import ventasRoutes from './ventas.routes.js'
import categoriaDulceriaRoutes from './categoria_dulceria.routes.js';
import dulceriaRoutes from './dulceria.routes.js';
import stockDulceriaCinesRoutes from './stock_dulceria_cines.routes.js';
import empleadosRoutes from './empleados.routes.js';
import detalleVentaRoutes from './detalle_venta.routes.js';
import historialRoutes from './historial.routes.js';
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
router.use('/peliculas', peliculasRoutes)
router.use('/funciones', funcionesRoutes)
router.use('/ventas', ventasRoutes)
router.use('/categoria_dulceria', categoriaDulceriaRoutes);
router.use('/dulceria', dulceriaRoutes);
router.use('/stock_dulceria_cines', stockDulceriaCinesRoutes);
router.use('/empleados', empleadosRoutes);
router.use('/detalle_venta', detalleVentaRoutes);
router.use('/historial', historialRoutes);
// Puedes agregar más rutas aquí para otras entidades o módulos
// Ejemplo:
// router.use('/otra-entidad', otraEntidadRoutes);

export default router;