
import * as historialService from '../services/historial.service.js';

export const getHistoriales = async (req, res) => {
    try {
        const historiales = await historialService.getAllHistorial();
        res.json(historiales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getHistorial = async (req, res) => {
    try {
        const historial = await historialService.getHistorialById(req.params.id);
        if (!historial) {
            return res.status(404).json({ message: 'Historial not found' });
        }
        res.json(historial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createHistorial = async (req, res) => {
    try {
        const newHistorial = await historialService.createHistorial(req.body);
        res.status(201).json(newHistorial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateHistorial = async (req, res) => {
    try {
        const updatedHistorial = await historialService.updateHistorial(req.params.id, req.body);
        res.json(updatedHistorial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteHistorial = async (req, res) => {
    try {
        const result = await historialService.deleteHistorial(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Historial not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
