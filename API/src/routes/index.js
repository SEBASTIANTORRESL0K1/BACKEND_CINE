import { Router } from 'express';
import cinesRoutes from './cines.routes.js';
import salasRoutes from './salas.routes.js';
import asientosRoutes from './asientos.routes.js';
import usuariosRoutes from './usuarios.routes.js';
import membresiasRoutes from './membresias.routes.js';
import clientesRoutes from './clientes.routes.js';
import reservasRoutes from './reservas.routes.js';
import peliculasRoutes from './peliculas.routes.js';
import funcionesRoutes from './funciones.routes.js';
import ventasRoutes from './ventas.routes.js';
import categoriasDulceriaRoutes from './categoriasDulceria.routes.js';
import dulceriaRoutes from './dulceria.routes.js';
import stockDulceriaCinesRoutes from './stockDulceriaCines.routes.js';
import empleadosRoutes from './empleados.routes.js';
import detalleVentaRoutes from './detalleVenta.routes.js';
import historialRoutes from './historial.routes.js';

const router = Router();

const apiRoutes = [cinesRoutes, salasRoutes, asientosRoutes, usuariosRoutes, membresiasRoutes, clientesRoutes, reservasRoutes, peliculasRoutes, funcionesRoutes, ventasRoutes, categoriasDulceriaRoutes, dulceriaRoutes, stockDulceriaCinesRoutes, empleadosRoutes, detalleVentaRoutes, historialRoutes];

apiRoutes.forEach(route => router.use(route));

export default router;