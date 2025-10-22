
import * as dulceriaService from '../services/dulceria.service.js';

export const getDulceria = async (req, res) => {
    try {
        const dulceria = await dulceriaService.getAllDulceria();
        res.json(dulceria);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDulce = async (req, res) => {
    try {
        const dulce = await dulceriaService.getDulceById(req.params.id);
        if (!dulce) {
            return res.status(404).json({ message: 'Dulce not found' });
        }
        res.json(dulce);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createDulce = async (req, res) => {
    try {
        const newDulce = await dulceriaService.createDulce(req.body);
        res.status(201).json(newDulce);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateDulce = async (req, res) => {
    try {
        const updatedDulce = await dulceriaService.updateDulce(req.params.id, req.body);
        res.json(updatedDulce);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteDulce = async (req, res) => {
    try {
        const result = await dulceriaService.deleteDulce(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Dulce not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
