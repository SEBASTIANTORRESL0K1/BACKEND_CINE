import { obtenerUsuarioPorId } from './usuarios.controller.js';
import * as clientesService from '../services/clientes.service.js';
import {Cliente } from '../models/Cliente.js';

export const getClientes = async (req, res) => {
    try {
        const clientes = await clientesService.getAllClientes();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCliente = async (req, res) => {
    try {
        const cliente = await clientesService.getClienteById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente not found' });
        }
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createCliente = async (req, res) => {
    try {
        const newCliente = await clientesService.createCliente(req.body);
        res.status(201).json(newCliente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCliente = async (req, res) => {
    try {
        const updatedCliente = await clientesService.updateCliente(req.params.id, req.body);
        res.json(updatedCliente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCliente = async (req, res) => {
    try {
        const result = await clientesService.deleteCliente(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Cliente not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
