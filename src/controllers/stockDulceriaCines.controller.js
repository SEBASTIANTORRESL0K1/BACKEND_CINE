
import * as stockDulceriaCinesService from '../services/stockDulceriaCines.service.js';

export const getStockDulceriaCines = async (req, res) => {
    try {
        const stock = await stockDulceriaCinesService.getAllStockDulceriaCines();
        res.json(stock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getStockDulceriaCine = async (req, res) => {
    try {
        const stock = await stockDulceriaCinesService.getStockDulceriaCineById(req.params.id);
        if (!stock) {
            return res.status(404).json({ message: 'Stock not found' });
        }
        res.json(stock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createStockDulceriaCine = async (req, res) => {
    try {
        const newStock = await stockDulceriaCinesService.createStockDulceriaCine(req.body);
        res.status(201).json(newStock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateStockDulceriaCine = async (req, res) => {
    try {
        const updatedStock = await stockDulceriaCinesService.updateStockDulceriaCine(req.params.id, req.body);
        res.json(updatedStock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteStockDulceriaCine = async (req, res) => {
    try {
        const result = await stockDulceriaCinesService.deleteStockDulceriaCine(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Stock not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
