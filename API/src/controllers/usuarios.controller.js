
import * as usuariosService from '../services/usuarios.service.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config.js';

// Función para generar un token
const generateToken = (usuario) => {
    return jwt.sign(
        { id: usuario.id_usuario, rol: usuario.rol }, // Payload
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN } // El token expira según la configuración
    );
};

export const obtenerTodosLosUsuarios = async (req, res) => {
    try {
        const usuarios = await usuariosService.obtenerTodosLosUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await usuariosService.obtenerUsuarioPorId(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario not found' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const crearUsuario = async (req, res) => {
    try {
        const newUsuario = await usuariosService.crearUsuario(req.body);
        const token = generateToken(newUsuario);
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginController = async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        const usuario = await usuariosService.loginUsuario(correo, contrasena);
        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        const rol = await usuariosService.obtenerRolPorIdUsuario(usuario.id_usuario);
        usuario.rol = rol;
        const token = generateToken(usuario);
        res.json({ token,rol });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const actualizarUsuario = async (req, res) => {
    try {
        const updatedUsuario = await usuariosService.actualizarUsuario(req.params.id, req.body);
        res.json(updatedUsuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const eliminarUsuario = async (req, res) => {
    try {
        const result = await usuariosService.eliminarUsuario(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Usuario not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
