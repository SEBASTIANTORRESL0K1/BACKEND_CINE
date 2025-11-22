import historialModel from '../models/historial.models.js';
import usuarioModel from '../models/usuarios.models.js';

const historialController = {
    getAll: async (req, res) => {
        try {
            const historial = await historialModel.findAll();
            res.status(200).json({
                success: true,
                message: 'Historial obtenido exitosamente',
                data: historial,
            });
        } catch (error) {
            console.error('❌ Error en getAll:', error.message);
            res.status(500).json({ success: false, message: 'Error al obtener el historial' });
        }
    },

    getById: async (req, res) => {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID debe ser un número válido' });
        }

        try {
            const registro = await historialModel.findById(id);
            if (!registro) {
                return res.status(404).json({ success: false, message: 'Registro de historial no encontrado' });
            }
            res.status(200).json({
                success: true,
                message: 'Registro de historial encontrado exitosamente',
                data: registro,
            });
        } catch (error) {
            console.error('❌ Error en getById:', error.message);
            res.status(500).json({ success: false, message: 'Error al buscar el registro de historial por ID' });
        }
    },

    create: async (req, res) => {
        const { id_usuario, ip, tipo_movimiento, descripcion, tabla_afectada, id_registro_afectado, exito, origen } = req.body;

        if (!tipo_movimiento) {
            return res.status(400).json({ success: false, message: 'El tipo de movimiento es obligatorio' });
        }

        try {
            // Validar FK
            if (id_usuario) {
                const usuario = await usuarioModel.findById(id_usuario);
                if (!usuario) {
                    return res.status(400).json({ success: false, message: 'El usuario especificado no existe' });
                }
            }

            const nuevoRegistro = await historialModel.create({ id_usuario, ip, tipo_movimiento, descripcion, tabla_afectada, id_registro_afectado, exito, origen });
            res.status(201).json({
                success: true,
                message: 'Registro de historial creado exitosamente',
                data: nuevoRegistro,
            });
        } catch (error) {
            console.error('❌ Error en create:', error.message);
            res.status(500).json({ success: false, message: 'Error al crear el registro de historial' });
        }
    },

    patch: async (req, res) => {
        const { id } = req.params;
        const data = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID debe ser un número válido' });
        }

        try {
            const registro = await historialModel.findById(id);
            if (!registro) {
                return res.status(404).json({ success: false, message: 'Registro de historial no encontrado' });
            }

            if (data.id_usuario) {
                const usuario = await usuarioModel.findById(data.id_usuario);
                if (!usuario) {
                    return res.status(400).json({ success: false, message: 'El usuario especificado no existe' });
                }
            }

            const actualizado = await historialModel.patch(id, data);
            if (!actualizado) {
                return res.status(400).json({ success: false, message: 'No se realizaron cambios' });
            }

            res.status(200).json({ success: true, message: 'Registro de historial actualizado exitosamente' });
        } catch (error) {
            console.error('❌ Error en patch:', error.message);
            res.status(500).json({ success: false, message: 'Error al actualizar el registro de historial' });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID debe ser un número válido' });
        }

        try {
            const eliminado = await historialModel.delete(id);
            if (!eliminado) {
                return res.status(404).json({ success: false, message: 'Registro de historial no encontrado' });
            }
            res.status(200).json({ success: true, message: 'Registro de historial eliminado exitosamente' });
        } catch (error) {
            console.error('❌ Error en delete:', error.message);
            res.status(500).json({ success: false, message: 'Error al eliminar el registro de historial' });
        }
    },
};

export default historialController;
