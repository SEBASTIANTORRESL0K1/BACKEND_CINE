
import * as peliculasService from '../services/peliculas.service.js';

export const getPeliculas = async (req, res) => {
    try {
        const peliculas = await peliculasService.getAllPeliculas();
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPelicula = async (req, res) => {
    try {
        const pelicula = await peliculasService.getPeliculaById(req.params.id);
        if (!pelicula) {
            return res.status(404).json({ message: 'Pelicula not found' });
        }
        res.json(pelicula);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createPelicula = async (req, res) => {
    try {
        const newPelicula = await peliculasService.createPelicula(req.body);
        res.status(201).json(newPelicula);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePelicula = async (req, res) => {
    try {
        const updatedPelicula = await peliculasService.updatePelicula(req.params.id, req.body);
        res.json(updatedPelicula);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePelicula = async (req, res) => {
    try {
        const result = await peliculasService.deletePelicula(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Pelicula not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
