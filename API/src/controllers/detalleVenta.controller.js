
import * as detalleVentaService from '../services/detalleVenta.service.js';

export const getDetalleVentas = async (req, res) => {
    try {
        const detalles = await detalleVentaService.getAllDetalleVentas();
        res.json(detalles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDetalleVenta = async (req, res) => {
    try {
        const detalle = await detalleVentaService.getDetalleVentaById(req.params.id);
        if (!detalle) {
            return res.status(404).json({ message: 'Detalle not found' });
        }
        res.json(detalle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createDetalleVenta = async (req, res) => {
    try {
        const newDetalle = await detalleVentaService.createDetalleVenta(req.body);
        res.status(201).json(newDetalle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateDetalleVenta = async (req, res) => {
    try {
        const updatedDetalle = await detalleVentaService.updateDetalleVenta(req.params.id, req.body);
        res.json(updatedDetalle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteDetalleVenta = async (req, res) => {
    try {
        const result = await detalleVentaService.deleteDetalleVenta(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Detalle not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
