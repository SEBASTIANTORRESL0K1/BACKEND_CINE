
import * as ventasService from '../services/ventas.service.js';

export const getVentas = async (req, res) => {
    try {
        const ventas = await ventasService.getAllVentas();
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getVenta = async (req, res) => {
    try {
        const venta = await ventasService.getVentaById(req.params.id);
        if (!venta) {
            return res.status(404).json({ message: 'Venta not found' });
        }
        res.json(venta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createVenta = async (req, res) => {
    try {
        const newVenta = await ventasService.createVenta(req.body);
        res.status(201).json(newVenta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateVenta = async (req, res) => {
    try {
        const updatedVenta = await ventasService.updateVenta(req.params.id, req.body);
        res.json(updatedVenta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteVenta = async (req, res) => {
    try {
        const result = await ventasService.deleteVenta(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Venta not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
