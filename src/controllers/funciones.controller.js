
import * as funcionesService from '../services/funciones.service.js';

export const getFunciones = async (req, res) => {
    try {
        const funciones = await funcionesService.getAllFunciones();
        res.json(funciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getFuncion = async (req, res) => {
    try {
        const funcion = await funcionesService.getFuncionById(req.params.id);
        if (!funcion) {
            return res.status(404).json({ message: 'Funcion not found' });
        }
        res.json(funcion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createFuncion = async (req, res) => {
    try {
        const newFuncion = await funcionesService.createFuncion(req.body);
        res.status(201).json(newFuncion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateFuncion = async (req, res) => {
    try {
        const updatedFuncion = await funcionesService.updateFuncion(req.params.id, req.body);
        res.json(updatedFuncion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteFuncion = async (req, res) => {
    try {
        const result = await funcionesService.deleteFuncion(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Funcion not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
