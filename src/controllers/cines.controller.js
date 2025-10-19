
import * as cinesService from '../services/cines.service.js';

export const getCines = async (req, res) => {
    try {
        const cines = await cinesService.obtenerTodosLosCines();
        res.json(cines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCine = async (req, res) => {
    try {
        const cine = await cinesService.getCineById(req.params.id);
        if (!cine) {
            return res.status(404).json({ message: 'Cine not found' });
        }
        res.json(cine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createCine = async (req, res) => {
    try {
        const newCine = await cinesService.createCine(req.body);
        res.status(201).json(newCine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCine = async (req, res) => {
    try {
        const updatedCine = await cinesService.updateCine(req.params.id, req.body);
        res.json(updatedCine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCine = async (req, res) => {
    try {
        const result = await cinesService.deleteCine(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Cine not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const obtenerCinesPorNombre = async (req, res) => {
    try{    
        const cine = await cinesService.obtenerCinesPorNombre(req.params.nombre_cine);
        if (!cine) {
            return res.status(404).json({ message: 'Cine not found' });
        }
        res.json(cine);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};