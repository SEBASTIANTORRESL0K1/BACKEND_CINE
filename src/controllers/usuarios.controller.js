import usuarioModel from "../models/usuarios.models.js";

/**
 * Controlador para manejar operaciones relacionadas con usuarios.
 */
const usuarioController = {
    /**
     * Obtiene todos los usuarios.
     * @param {Object} req - Solicitud HTTP.
     * @param {Object} res - Respuesta HTTP.
     */
    getAllUsuarios: async (req, res) => {
        try {
            const usuarios = await usuarioModel.getAll();
            res.status(200).json({
                success: true,
                message: 'Lista de usuarios obtenida exitosamente',
                data: usuarios,
            });
        } catch (error) {
            console.error('❌ Error en getAllUsuarios:', error.message);
            res.status(500).json({
                success: false,
                message: 'Error al obtener la lista de usuarios',
            });
        }
    },

    /**
     * Obtiene un usuario por su ID.
     * @param {Object} req - Solicitud HTTP.
     * @param {Object} res - Respuesta HTTP.
     */
    getUsuarioById: async (req, res) => {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'El ID del usuario debe ser un número válido',
            });
        }

        try {
            const usuario = await usuarioModel.getById(id);

            if (!usuario) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado',
                });
            }

            res.status(200).json({
                success: true,
                message: 'Usuario encontrado exitosamente',
                data: usuario,
            });
        } catch (error) {
            console.error('❌ Error en getUsuarioById:', error.message);
            res.status(500).json({
                success: false,
                message: 'Error al buscar el usuario por ID',
            });
        }
    },

    /**
     * Busca usuarios por nombre, primer apellido y/o segundo apellido.
     * @param {Object} req - Solicitud HTTP.
     * @param {Object} res - Respuesta HTTP.
     */
    getUsuariosByName: async (req, res) => {
        const { nombre, primer_apellido, segundo_apellido } = req.query;

        try {


            const usuarios = await usuarioModel.getByName(nombre, primer_apellido, segundo_apellido);

            if (usuarios.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No se encontraron usuarios con los criterios proporcionados',
                });
            }

            res.status(200).json({
                success: true,
                message: 'Usuarios encontrados exitosamente',
                data: usuarios,
            });
        } catch (error) {
            console.error('❌ Error en getUsuariosByName:', error.message);
            res.status(500).json({
                success: false,
                message: 'Error al buscar usuarios por nombre/apellidos',
            });
        }
    },
    getUsuarioByEmail: async (req, res) => {
        const { correo } = req.query;
        try {
            const usuario = await usuarioModel.getByEmail(correo);
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Usuario encontrado exitosamente',
                    data: usuario,
                });
            }
        }
        catch (error) {
            console.error('❌ Error en getUsuarioByEmail:', error.message);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    getUsuarioByPhoneNumber: async (req, res) => {
        const { numero_telefono } = req.query;
        try {
            const usuario = await usuarioModel.getByPhoneNumber(numero_telefono);
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }
            res.status(200).json({
                success: true,
                message: 'Usuario encontrado exitosamente',
                data: usuario,
            });
        }
        catch (error) {
            console.error('❌ Error en getUsuarioByPhoneNumber:', error.message);
            res.status(500).json({
                success: false,
                message: 'Error al buscar el usuario por numero de telefono',
            });
        }
    },

    /**
     * Crea un nuevo usuario.
     * @param {Object} req - Solicitud HTTP.
     * @param {Object} res - Respuesta HTTP.
     */
    createUsuario: async (req, res) => {
        // Validación del cuerpo de la solicitud
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'El cuerpo de la solicitud no puede estar vacío',
            });
        }

        const { nombre, primer_apellido, segundo_apellido, fecha_nacimiento, sexo, codigo_postal, numero_telefono, correo, contrasena } =
            req.body;

        // Validación de campos obligatorios
        if (
            !nombre ||
            !primer_apellido ||
            !segundo_apellido ||
            !fecha_nacimiento ||
            !sexo ||
            !codigo_postal ||
            !numero_telefono ||
            !correo ||
            !contrasena
        ) {
            return res.status(400).json({
                success: false,
                message: 'Todos los campos son obligatorios',
            });
        }

        // Validación del campo correo
        if (!/\S+@\S+\.\S+/.test(correo)) {
            return res.status(400).json({
                success: false,
                message: 'El correo electrónico debe ser una dirección válida',
            });
        }

        // Validación del campo código postal
        if (codigo_postal.length !== 5 || !/^\d+$/.test(codigo_postal)) {
            return res.status(400).json({
                success: false,
                message: 'El código postal debe ser una cadena de exactamente 5 dígitos',
            });
        }

        // Validación del campo número de teléfono
        if (numero_telefono.length !== 10 || !/^\d+$/.test(numero_telefono)) {
            return res.status(400).json({
                success: false,
                message: 'El número de teléfono debe ser una cadena de exactamente 10 dígitos',
            });
        }

        try {

            const usuarioExistenteCorreo = await usuarioModel.getByEmail(correo);
            if (usuarioExistenteCorreo) {
                throw new Error('El correo electrónico ya está registrado');
            }
            const usuarioExistenteTelefono = await usuarioModel.getByPhoneNumber(numero_telefono);
            if (usuarioExistenteTelefono) {
                throw new Error('El número de teléfono ya está registrado');
            }
            // Crear el usuario
            const nuevoUsuario = await usuarioModel.create(req.body);

            res.status(201).json({
                success: true,
                message: 'Usuario creado exitosamente',
                data: nuevoUsuario,
            });
        } catch (error) {
            console.error('❌ Error en createUsuario:', error.message);
            res.status(500).json({
                success: false,
                message: 'Error al crear el usuario',
                error: error.message,
            });
        }
    },

    /**
     * Actualiza un usuario existente.
     * @param {Object} req - Solicitud HTTP.
     * @param {Object} res - Respuesta HTTP.
     */
    patchUsuario: async (req, res) => {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'El ID del usuario debe ser un número válido',
            });
        }

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Al menos un campo debe ser proporcionado para la actualización',
            });
        }

        try {
            const usuarioExistente = await usuarioModel.getById(id);
            if (!usuarioExistente) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado',
                });
            }

            const actualizado = await usuarioModel.patch(id, req.body);

            if (!actualizado) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado',
                });
            }

            res.status(200).json({
                success: true,
                message: 'Usuario actualizado exitosamente',
            });
        } catch (error) {
            console.error('❌ Error en patchUsuario:', error.message);
            res.status(500).json({
                success: false,
                message: 'Error al actualizar el usuario',
            });
        }
    },

    /**
     * Elimina un usuario por su ID.
     * @param {Object} req - Solicitud HTTP.
     * @param {Object} res - Respuesta HTTP.
     */
    deleteUsuario: async (req, res) => {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'El ID del usuario debe ser un número válido',
            });
        }

        try {
            const eliminado = await usuarioModel.delete(id);

            if (!eliminado) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado',
                });
            }

            res.status(200).json({
                success: true,
                message: 'Usuario eliminado exitosamente',
            });
        } catch (error) {
            console.error('❌ Error en deleteUsuario:', error.message);
            res.status(500).json({
                success: false,
                message: 'Error al eliminar el usuario',
            });
        }
    },
};

export default usuarioController;