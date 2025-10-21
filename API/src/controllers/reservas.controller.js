
import * as reservasService from '../services/reservas.service.js';

export const getReservas = async (req, res) => {
    try {
        const reservas = await reservasService.getAllReservas();
        res.json(reservas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getReserva = async (req, res) => {
    try {
        const reserva = await reservasService.getReservaById(req.params.id);
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva not found' });
        }
        res.json(reserva);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createReserva = async (req, res) => {
    try {
        const newReserva = await reservasService.createReserva(req.body);
        res.status(201).json(newReserva);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateReserva = async (req, res) => {
    try {
        const updatedReserva = await reservasService.updateReserva(req.params.id, req.body);
        res.json(updatedReserva);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteReserva = async (req, res) => {
    try {
        const result = await reservasService.deleteReserva(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Reserva not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
