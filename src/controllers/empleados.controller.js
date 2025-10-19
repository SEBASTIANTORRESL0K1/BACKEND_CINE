
import * as empleadosService from '../services/empleados.service.js';

export const getEmpleados = async (req, res) => {
    try {
        const empleados = await empleadosService.getAllEmpleados();
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getEmpleado = async (req, res) => {
    try {
        const empleado = await empleadosService.getEmpleadoById(req.params.id);
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado not found' });
        }
        res.json(empleado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createEmpleado = async (req, res) => {
    try {
        const newEmpleado = await empleadosService.createEmpleado(req.body);
        res.status(201).json(newEmpleado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateEmpleado = async (req, res) => {
    try {
        const updatedEmpleado = await empleadosService.updateEmpleado(req.params.id, req.body);
        res.json(updatedEmpleado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteEmpleado = async (req, res) => {
    try {
        const result = await empleadosService.deleteEmpleado(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Empleado not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
