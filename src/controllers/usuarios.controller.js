
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

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await usuariosService.getAllUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsuario = async (req, res) => {
    try {
        const usuario = await usuariosService.getUsuarioById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario not found' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createUsuario = async (req, res) => {
    try {
        const newUsuario = await usuariosService.createUsuario(req.body);
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

export const updateUsuario = async (req, res) => {
    try {
        const updatedUsuario = await usuariosService.updateUsuario(req.params.id, req.body);
        res.json(updatedUsuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUsuario = async (req, res) => {
    try {
        const result = await usuariosService.deleteUsuario(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Usuario not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
