import categoriaDulceriaModel from '../models/categoria_dulceria.models.js';

const categoriaDulceriaController = {
    getAll: async (req, res) => {
        try {
            const categorias = await categoriaDulceriaModel.findAll();
            res.status(200).json({
                success: true,
                message: 'Lista de categorías de dulcería obtenida exitosamente',
                data: categorias,
            });
        } catch (error) {
            console.error('❌ Error en getAll:', error.message);
            res.status(500).json({
                success: false,
                message: 'Error al obtener la lista de categorías de dulcería',
            });
        }
    },

    getById: async (req, res) => {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID debe ser un número válido' });
        }

        try {
            const categoria = await categoriaDulceriaModel.findById(id);
            if (!categoria) {
                return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
            }
            res.status(200).json({
                success: true,
                message: 'Categoría encontrada exitosamente',
                data: categoria,
            });
        } catch (error) {
            console.error('❌ Error en getById:', error.message);
            res.status(500).json({ success: false, message: 'Error al buscar la categoría por ID' });
        }
    },

    create: async (req, res) => {
        const { nombre } = req.body;
        if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
            return res.status(400).json({ success: false, message: 'El nombre es obligatorio y debe ser texto válido' });
        }

        try {
            const nuevaCategoria = await categoriaDulceriaModel.create({ nombre });
            res.status(201).json({
                success: true,
                message: 'Categoría creada exitosamente',
                data: nuevaCategoria,
            });
        } catch (error) {
            console.error('❌ Error en create:', error.message);
            res.status(500).json({ success: false, message: 'Error al crear la categoría' });
        }
    },

    patch: async (req, res) => {
        const { id } = req.params;
        const { nombre } = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID debe ser un número válido' });
        }
        if (nombre !== undefined && (typeof nombre !== 'string' || nombre.trim() === '')) {
            return res.status(400).json({ success: false, message: 'El nombre debe ser texto válido' });
        }

        try {
            const categoria = await categoriaDulceriaModel.findById(id);
            if (!categoria) {
                return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
            }

            const actualizado = await categoriaDulceriaModel.patch(id, { nombre });
            if (!actualizado) {
                return res.status(400).json({ success: false, message: 'No se realizaron cambios' });
            }

            res.status(200).json({ success: true, message: 'Categoría actualizada exitosamente' });
        } catch (error) {
            console.error('❌ Error en patch:', error.message);
            res.status(500).json({ success: false, message: 'Error al actualizar la categoría' });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID debe ser un número válido' });
        }

        try {
            const eliminado = await categoriaDulceriaModel.delete(id);
            if (!eliminado) {
                return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
            }
            res.status(200).json({ success: true, message: 'Categoría eliminada exitosamente' });
        } catch (error) {
            console.error('❌ Error en delete:', error.message);
            res.status(500).json({ success: false, message: 'Error al eliminar la categoría' });
        }
    },
};

export default categoriaDulceriaController;
