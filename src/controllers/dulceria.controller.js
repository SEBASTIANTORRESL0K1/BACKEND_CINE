import dulceriaModel from '../models/dulceria.models.js';
import categoriaDulceriaModel from '../models/categoria_dulceria.models.js';

const dulceriaController = {
    getAll: async (req, res) => {
        try {
            const dulces = await dulceriaModel.findAll();
            res.status(200).json({
                success: true,
                message: 'Lista de dulces obtenida exitosamente',
                data: dulces,
            });
        } catch (error) {
            console.error('❌ Error en getAll:', error.message);
            res.status(500).json({ success: false, message: 'Error al obtener la lista de dulces' });
        }
    },

    getById: async (req, res) => {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID debe ser un número válido' });
        }

        try {
            const dulce = await dulceriaModel.findById(id);
            if (!dulce) {
                return res.status(404).json({ success: false, message: 'Dulce no encontrado' });
            }
            res.status(200).json({
                success: true,
                message: 'Dulce encontrado exitosamente',
                data: dulce,
            });
        } catch (error) {
            console.error('❌ Error en getById:', error.message);
            res.status(500).json({ success: false, message: 'Error al buscar el dulce por ID' });
        }
    },

    create: async (req, res) => {
        const { nombre, tamano, tipo, id_categoria_dulceria, precio } = req.body;

        if (!nombre || !tamano || !tipo || !id_categoria_dulceria || !precio) {
            return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
        }

        try {
            // Validar FK
            const categoria = await categoriaDulceriaModel.findById(id_categoria_dulceria);
            if (!categoria) {
                return res.status(400).json({ success: false, message: 'La categoría de dulcería especificada no existe' });
            }

            const nuevoDulce = await dulceriaModel.create({ nombre, tamano, tipo, id_categoria_dulceria, precio });
            res.status(201).json({
                success: true,
                message: 'Dulce creado exitosamente',
                data: nuevoDulce,
            });
        } catch (error) {
            console.error('❌ Error en create:', error.message);
            res.status(500).json({ success: false, message: 'Error al crear el dulce' });
        }
    },

    patch: async (req, res) => {
        const { id } = req.params;
        const data = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID debe ser un número válido' });
        }

        try {
            const dulce = await dulceriaModel.findById(id);
            if (!dulce) {
                return res.status(404).json({ success: false, message: 'Dulce no encontrado' });
            }

            if (data.id_categoria_dulceria) {
                const categoria = await categoriaDulceriaModel.findById(data.id_categoria_dulceria);
                if (!categoria) {
                    return res.status(400).json({ success: false, message: 'La categoría de dulcería especificada no existe' });
                }
            }

            const actualizado = await dulceriaModel.patch(id, data);
            if (!actualizado) {
                return res.status(400).json({ success: false, message: 'No se realizaron cambios' });
            }

            res.status(200).json({ success: true, message: 'Dulce actualizado exitosamente' });
        } catch (error) {
            console.error('❌ Error en patch:', error.message);
            res.status(500).json({ success: false, message: 'Error al actualizar el dulce' });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID debe ser un número válido' });
        }

        try {
            const eliminado = await dulceriaModel.delete(id);
            if (!eliminado) {
                return res.status(404).json({ success: false, message: 'Dulce no encontrado' });
            }
            res.status(200).json({ success: true, message: 'Dulce eliminado exitosamente' });
        } catch (error) {
            console.error('❌ Error en delete:', error.message);
            res.status(500).json({ success: false, message: 'Error al eliminar el dulce' });
        }
    },
};

export default dulceriaController;
