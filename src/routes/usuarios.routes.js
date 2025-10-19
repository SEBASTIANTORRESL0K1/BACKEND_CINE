
import { Router } from 'express';
import * as usuariosController from '../controllers/usuarios.controller.js';

const router = Router();

router.get('/usuarios', usuariosController.getUsuarios);
router.get('/usuarios/:id', usuariosController.getUsuario);
router.post('/usuarios', usuariosController.createUsuario); // Sign-up
router.post('/usuarios/login', usuariosController.loginController); // Login
router.put('/usuarios/:id', usuariosController.updateUsuario);
router.delete('/usuarios/:id', usuariosController.deleteUsuario);

export default router;
