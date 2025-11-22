import stockDulceriaCinesModel from '../models/stock_dulceria_cines.models.js';
import cineModel from '../models/cines.models.js';
import dulceriaModel from '../models/dulceria.models.js';

const stockDulceriaCinesController = {
    getAll: async (req, res) => {
        try {
            const stock = await stockDulceriaCinesModel.findAll();
            res.status(200).json({
                success: true,
                message: 'Lista de stock obtenida exitosamente',
                data: stock,
            });
        } catch (error) {
            console.error('❌ Error en getAll:', error.message);
            res.status(500).json({ success: false, message: 'Error al obtener la lista de stock' });
        }
    },

    getById: async (req, res) => {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID debe ser un número válido' });
        }

        try {
            const stock = await stockDulceriaCinesModel.findById(id);
            if (!stock) {
                return res.status(404).json({ success: false, message: 'Stock no encontrado' });
            }
            res.status(200).json({
                success: true,
                message: 'Stock encontrado exitosamente',
                data: stock,
            });
        } catch (error) {
            console.error('❌ Error en getById:', error.message);
            res.status(500).json({ success: false, message: 'Error al buscar el stock por ID' });
        }
    },

    create: async (req, res) => {
        const { id_cine, id_dulce } = req.body;

        if (!id_cine || !id_dulce) {
            return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
        }

        try {
            // Validar FKs
            const cine = await cineModel.findById(id_cine);
            if (!cine) {
                return res.status(400).json({ success: false, message: 'El cine especificado no existe' });
            }

            const dulce = await dulceriaModel.findById(id_dulce);
            if (!dulce) {
                return res.status(400).json({ success: false, message: 'El dulce especificado no existe' });
            }

            const nuevoStock = await stockDulceriaCinesModel.create({ id_cine, id_dulce });
            res.status(201).json({
                success: true,
                message: 'Stock creado exitosamente',
                data: nuevoStock,
            });
        } catch (error) {
            console.error('❌ Error en create:', error.message);
            res.status(500).json({ success: false, message: 'Error al crear el stock' });
        }
    },

    patch: async (req, res) => {
        const { id } = req.params;
        const data = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID debe ser un número válido' });
        }

        try {
            const stock = await stockDulceriaCinesModel.findById(id);
            if (!stock) {
                return res.status(404).json({ success: false, message: 'Stock no encontrado' });
            }

            if (data.id_cine) {
                const cine = await cineModel.findById(data.id_cine);
                if (!cine) {
                    return res.status(400).json({ success: false, message: 'El cine especificado no existe' });
                }
            }

            if (data.id_dulce) {
                const dulce = await dulceriaModel.findById(data.id_dulce);
                if (!dulce) {
                    return res.status(400).json({ success: false, message: 'El dulce especificado no existe' });
                }
            }

            const actualizado = await stockDulceriaCinesModel.patch(id, data);
            if (!actualizado) {
                return res.status(400).json({ success: false, message: 'No se realizaron cambios' });
            }

            res.status(200).json({ success: true, message: 'Stock actualizado exitosamente' });
        } catch (error) {
            console.error('❌ Error en patch:', error.message);
            res.status(500).json({ success: false, message: 'Error al actualizar el stock' });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID debe ser un número válido' });
        }

        try {
            const eliminado = await stockDulceriaCinesModel.delete(id);
            if (!eliminado) {
                return res.status(404).json({ success: false, message: 'Stock no encontrado' });
            }
            res.status(200).json({ success: true, message: 'Stock eliminado exitosamente' });
        } catch (error) {
            console.error('❌ Error en delete:', error.message);
            res.status(500).json({ success: false, message: 'Error al eliminar el stock' });
        }
    },
};

export default stockDulceriaCinesController;
