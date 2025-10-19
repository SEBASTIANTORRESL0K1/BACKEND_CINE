
import * as asientosService from '../services/asientos.service.js';

export const getAsientos = async (req, res) => {
    try {
        const asientos = await asientosService.getAllAsientos();
        res.json(asientos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAsiento = async (req, res) => {
    try {
        const asiento = await asientosService.getAsientoById(req.params.id);
        if (!asiento) {
            return res.status(404).json({ message: 'Asiento not found' });
        }
        res.json(asiento);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createAsiento = async (req, res) => {
    try {
        const newAsiento = await asientosService.createAsiento(req.body);
        res.status(201).json(newAsiento);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateAsiento = async (req, res) => {
    try {
        const updatedAsiento = await asientosService.updateAsiento(req.params.id, req.body);
        res.json(updatedAsiento);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAsiento = async (req, res) => {
    try {
        const result = await asientosService.deleteAsiento(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Asiento not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
