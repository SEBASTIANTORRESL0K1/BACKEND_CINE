
import * as usuariosService from '../services/usuarios.service.js';

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
        res.status(201).json(newUsuario);
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
