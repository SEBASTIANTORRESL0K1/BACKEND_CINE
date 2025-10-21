
import * as categoriasDulceriaService from '../services/categoriasDulceria.service.js';

export const getCategoriasDulceria = async (req, res) => {
    try {
        const categorias = await categoriasDulceriaService.getAllCategoriasDulceria();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCategoriaDulceria = async (req, res) => {
    try {
        const categoria = await categoriasDulceriaService.getCategoriaDulceriaById(req.params.id);
        if (!categoria) {
            return res.status(404).json({ message: 'Categoria not found' });
        }
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createCategoriaDulceria = async (req, res) => {
    try {
        const newCategoria = await categoriasDulceriaService.createCategoriaDulceria(req.body);
        res.status(201).json(newCategoria);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCategoriaDulceria = async (req, res) => {
    try {
        const updatedCategoria = await categoriasDulceriaService.updateCategoriaDulceria(req.params.id, req.body);
        res.json(updatedCategoria);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCategoriaDulceria = async (req, res) => {
    try {
        const result = await categoriasDulceriaService.deleteCategoriaDulceria(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Categoria not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
