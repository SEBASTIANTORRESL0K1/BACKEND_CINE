import ventasModel from "../models/ventas.models.js";

const ventasController = {
    // Obtener todas las ventas
    getAll: async (req, res) => {
        try {
            const ventas = await ventasModel.getAll();
            res.status(200).json(ventas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener una venta por ID
    getById: async (req, res) => {
        try {
            const { id_venta } = req.params;
            const venta = await ventasModel.getById(id_venta);

            if (!venta) {
                return res.status(404).json({ error: "Venta no encontrada" });
            }

            res.status(200).json(venta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Crear una nueva venta
    create: async (req, res) => {
        try {
            const { id_cliente, total } = req.body;

            if (!id_cliente || !total) {
                return res.status(400).json({ error: "Se requieren id_cliente y total" });
            }

            const nuevaVenta = await ventasModel.create(id_cliente, total);
            res.status(201).json(nuevaVenta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar una venta
    update: async (req, res) => {
        try {
            const { id_venta } = req.params;
            const updates = req.body;

            if (Object.keys(updates).length === 0) {
                return res.status(400).json({ error: "No hay campos para actualizar" });
            }

            const ventaActualizada = await ventasModel.update(id_venta, updates);

            if (!ventaActualizada) {
                return res.status(404).json({ error: "Venta no encontrada" });
            }

            res.status(200).json(ventaActualizada);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Eliminar una venta
    delete: async (req, res) => {
        try {
            const { id_venta } = req.params;
            const ventaEliminada = await ventasModel.delete(id_venta);

            if (!ventaEliminada) {
                return res.status(404).json({ error: "Venta no encontrada" });
            }

            res.status(200).json({ message: "Venta eliminada correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

export default ventasController;