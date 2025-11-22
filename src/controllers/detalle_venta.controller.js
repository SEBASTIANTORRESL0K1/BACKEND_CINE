import detalleVentaModel from '../models/detalle_venta.models.js';
import ventasModel from '../models/ventas.models.js';
import funcionesModel from '../models/funciones.models.js';
import asientosModel from '../models/asientos.models.js';
import dulceriaModel from '../models/dulceria.models.js';

const detalleVentaController = {
    getAll: async (req, res) => {
        try {
            const detalles = await detalleVentaModel.findAll();
            res.status(200).json({
                success: true,
                message: 'Lista de detalles de venta obtenida exitosamente',
                data: detalles,
            });
        } catch (error) {
            console.error('❌ Error en getAll:', error.message);
            res.status(500).json({ success: false, message: 'Error al obtener la lista de detalles de venta' });
        }
    },

    getById: async (req, res) => {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID debe ser un número válido' });
        }

        try {
            const detalle = await detalleVentaModel.findById(id);
            if (!detalle) {
                return res.status(404).json({ success: false, message: 'Detalle de venta no encontrado' });
            }
            res.status(200).json({
                success: true,
                message: 'Detalle de venta encontrado exitosamente',
                data: detalle,
            });
        } catch (error) {
            console.error('❌ Error en getById:', error.message);
            res.status(500).json({ success: false, message: 'Error al buscar el detalle de venta por ID' });
        }
    },

    create: async (req, res) => {
        const { id_venta, cantidad, precio, id_funcion, id_asiento, id_dulce, tipo_item, subtotal } = req.body;

        if (!id_venta || !cantidad || !precio || !tipo_item || !subtotal) {
            return res.status(400).json({ success: false, message: 'Campos obligatorios faltantes' });
        }

        try {
            // Validar FKs
            const venta = await ventasModel.getById(id_venta); // Assuming getById exists in ventasModel
            if (!venta) {
                return res.status(400).json({ success: false, message: 'La venta especificada no existe' });
            }

            if (id_funcion) {
                const funcion = await funcionesModel.findById(id_funcion);
                if (!funcion) return res.status(400).json({ success: false, message: 'La función especificada no existe' });
            }

            if (id_asiento) {
                const asiento = await asientosModel.findById(id_asiento);
                if (!asiento) return res.status(400).json({ success: false, message: 'El asiento especificado no existe' });
            }

            if (id_dulce) {
                const dulce = await dulceriaModel.findById(id_dulce);
                if (!dulce) return res.status(400).json({ success: false, message: 'El dulce especificado no existe' });
            }

            const nuevoDetalle = await detalleVentaModel.create({ id_venta, cantidad, precio, id_funcion, id_asiento, id_dulce, tipo_item, subtotal });
            res.status(201).json({
                success: true,
                message: 'Detalle de venta creado exitosamente',
                data: nuevoDetalle,
            });
        } catch (error) {
            console.error('❌ Error en create:', error.message);
            res.status(500).json({ success: false, message: 'Error al crear el detalle de venta' });
        }
    },

    patch: async (req, res) => {
        const { id } = req.params;
        const data = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID debe ser un número válido' });
        }

        try {
            const detalle = await detalleVentaModel.findById(id);
            if (!detalle) {
                return res.status(404).json({ success: false, message: 'Detalle de venta no encontrado' });
            }

            if (data.id_venta) {
                const venta = await ventasModel.getById(data.id_venta);
                if (!venta) return res.status(400).json({ success: false, message: 'La venta especificada no existe' });
            }
            if (data.id_funcion) {
                const funcion = await funcionesModel.findById(data.id_funcion);
                if (!funcion) return res.status(400).json({ success: false, message: 'La función especificada no existe' });
            }
            if (data.id_asiento) {
                const asiento = await asientosModel.findById(data.id_asiento);
                if (!asiento) return res.status(400).json({ success: false, message: 'El asiento especificado no existe' });
            }
            if (data.id_dulce) {
                const dulce = await dulceriaModel.findById(data.id_dulce);
                if (!dulce) return res.status(400).json({ success: false, message: 'El dulce especificado no existe' });
            }

            const actualizado = await detalleVentaModel.patch(id, data);
            if (!actualizado) {
                return res.status(400).json({ success: false, message: 'No se realizaron cambios' });
            }

            res.status(200).json({ success: true, message: 'Detalle de venta actualizado exitosamente' });
        } catch (error) {
            console.error('❌ Error en patch:', error.message);
            res.status(500).json({ success: false, message: 'Error al actualizar el detalle de venta' });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID debe ser un número válido' });
        }

        try {
            const eliminado = await detalleVentaModel.delete(id);
            if (!eliminado) {
                return res.status(404).json({ success: false, message: 'Detalle de venta no encontrado' });
            }
            res.status(200).json({ success: true, message: 'Detalle de venta eliminado exitosamente' });
        } catch (error) {
            console.error('❌ Error en delete:', error.message);
            res.status(500).json({ success: false, message: 'Error al eliminar el detalle de venta' });
        }
    },
};

export default detalleVentaController;
