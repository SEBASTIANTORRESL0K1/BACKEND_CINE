import empleadosModel from '../models/empleados.models.js';
import usuarioModel from '../models/usuarios.models.js';

const empleadosController = {
    getAll: async (req, res) => {
        try {
            const empleados = await empleadosModel.findAll();
            res.status(200).json({
                success: true,
                message: 'Lista de empleados obtenida exitosamente',
                data: empleados,
            });
        } catch (error) {
            console.error('❌ Error en getAll:', error.message);
            res.status(500).json({ success: false, message: 'Error al obtener la lista de empleados' });
        }
    },

    getById: async (req, res) => {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID debe ser un número válido' });
        }

        try {
            const empleado = await empleadosModel.findById(id);
            if (!empleado) {
                return res.status(404).json({ success: false, message: 'Empleado no encontrado' });
            }
            res.status(200).json({
                success: true,
                message: 'Empleado encontrado exitosamente',
                data: empleado,
            });
        } catch (error) {
            console.error('❌ Error en getById:', error.message);
            res.status(500).json({ success: false, message: 'Error al buscar el empleado por ID' });
        }
    },

    create: async (req, res) => {
        const { id_usuario, fecha_contratacion, activo, rol } = req.body;

        if (!id_usuario || !fecha_contratacion || activo === undefined || !rol) {
            return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
        }

        try {
            // Validar FK
            const usuario = await usuarioModel.findById(id_usuario);
            if (!usuario) {
                return res.status(400).json({ success: false, message: 'El usuario especificado no existe' });
            }

            const nuevoEmpleado = await empleadosModel.create({ id_usuario, fecha_contratacion, activo, rol });
            res.status(201).json({
                success: true,
                message: 'Empleado creado exitosamente',
                data: nuevoEmpleado,
            });
        } catch (error) {
            console.error('❌ Error en create:', error.message);
            res.status(500).json({ success: false, message: 'Error al crear el empleado' });
        }
    },

    patch: async (req, res) => {
        const { id } = req.params;
        const data = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID debe ser un número válido' });
        }

        try {
            const empleado = await empleadosModel.findById(id);
            if (!empleado) {
                return res.status(404).json({ success: false, message: 'Empleado no encontrado' });
            }

            if (data.id_usuario) {
                const usuario = await usuarioModel.findById(data.id_usuario);
                if (!usuario) {
                    return res.status(400).json({ success: false, message: 'El usuario especificado no existe' });
                }
            }

            const actualizado = await empleadosModel.patch(id, data);
            if (!actualizado) {
                return res.status(400).json({ success: false, message: 'No se realizaron cambios' });
            }

            res.status(200).json({ success: true, message: 'Empleado actualizado exitosamente' });
        } catch (error) {
            console.error('❌ Error en patch:', error.message);
            res.status(500).json({ success: false, message: 'Error al actualizar el empleado' });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID debe ser un número válido' });
        }

        try {
            const eliminado = await empleadosModel.delete(id);
            if (!eliminado) {
                return res.status(404).json({ success: false, message: 'Empleado no encontrado' });
            }
            res.status(200).json({ success: true, message: 'Empleado eliminado exitosamente' });
        } catch (error) {
            console.error('❌ Error en delete:', error.message);
            res.status(500).json({ success: false, message: 'Error al eliminar el empleado' });
        }
    },
};

export default empleadosController;
