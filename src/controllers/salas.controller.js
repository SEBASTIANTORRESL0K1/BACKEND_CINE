
import * as salasService from '../services/salas.service.js';

export const getSalas = async (req, res) => {
    try {
        const salas = await salasService.getAllSalas();
        res.json(salas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSala = async (req, res) => {
    try {
        const sala = await salasService.getSalaById(req.params.id);
        if (!sala) {
            return res.status(404).json({ message: 'Sala not found' });
        }
        res.json(sala);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createSala = async (req, res) => {
    try {
        const newSala = await salasService.createSala(req.body);
        res.status(201).json(newSala);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSala = async (req, res) => {
    try {
        const updatedSala = await salasService.updateSala(req.params.id, req.body);
        res.json(updatedSala);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteSala = async (req, res) => {
    try {
        const result = await salasService.deleteSala(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Sala not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
