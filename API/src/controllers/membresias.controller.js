
import * as membresiasService from '../services/membresias.service.js';

export const getMembresias = async (req, res) => {
    try {
        const membresias = await membresiasService.getAllMembresias();
        res.json(membresias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMembresia = async (req, res) => {
    try {
        const membresia = await membresiasService.getMembresiaById(req.params.id);
        if (!membresia) {
            return res.status(404).json({ message: 'Membresia not found' });
        }
        res.json(membresia);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createMembresia = async (req, res) => {
    try {
        const newMembresia = await membresiasService.createMembresia(req.body);
        res.status(201).json(newMembresia);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateMembresia = async (req, res) => {
    try {
        const updatedMembresia = await membresiasService.updateMembresia(req.params.id, req.body);
        res.json(updatedMembresia);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteMembresia = async (req, res) => {
    try {
        const result = await membresiasService.deleteMembresia(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Membresia not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
