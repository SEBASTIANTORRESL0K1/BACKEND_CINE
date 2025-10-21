
import * as cinesService from '../services/cines.service.js';

export const obtenerTodosLosCines = async (req, res) => {
    try {
        const cines = await cinesService.obtenerTodosLosCines();
        res.json(cines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const obtenerCinePorId = async (req, res) => {
    try {
        const cine = await cinesService.obtenerCinePorId(req.params.id);
        if (!cine) {
            return res.status(404).json({ message: 'Cine not found' });
        }
        res.json(cine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const crearCine = async (req, res) => {
    try {
        const newCine = await cinesService.crearCine(req.body);
        res.status(201).json(newCine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const actualizarCine = async (req, res) => {
    try {
        const updatedCine = await cinesService.actualizarCine(req.params.id, req.body);
        res.json(updatedCine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const eliminarCine = async (req, res) => {
    try {
        const result = await cinesService.eliminarCine(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Cine not found' });
        }
        if(result){
            res.status(200).json({message: 'Cine deleted' });
        }
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