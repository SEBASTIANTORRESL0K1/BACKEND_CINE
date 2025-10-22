import { verificarToken, isAdmin } from '../middleware/auth.middleware.js';

import { Router } from 'express';
import * as usuariosController from '../controllers/usuarios.controller.js';

const router = Router();

router.get('/usuarios',[verificarToken, isAdmin], usuariosController.obtenerTodosLosUsuarios);
router.get('/usuarios/:id', [verificarToken, isAdmin],usuariosController.obtenerUsuarioPorId);
router.post('/usuarios', [verificarToken, isAdmin],usuariosController.crearUsuario); 
router.post('/usuarios/login', usuariosController.loginController); 
router.put('/usuarios/:id', [verificarToken, isAdmin],usuariosController.actualizarUsuario);
router.delete('/usuarios/:id',[verificarToken, isAdmin], usuariosController.eliminarUsuario);

export default router;
