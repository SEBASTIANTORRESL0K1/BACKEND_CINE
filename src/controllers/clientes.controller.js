import clienteModel from "../models/clientes.models.js";
import usuarioModel from "../models/usuarios.models.js";

/**
 * Controlador para manejar operaciones relacionadas con clientes.
 */
const clienteController = {
  /**
   * Obtiene todos los clientes.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  getAllClientes: async (req, res) => {
    try {
      const clientes = await clienteModel.getAll();
      res.status(200).json({
        success: true,
        message: 'Lista de clientes obtenida exitosamente',
         clientes,
      });
    } catch (error) {
      console.error('❌ Error en getAllClientes:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al obtener la lista de clientes',
      });
    }
  },

  /**
   * Obtiene un cliente por su ID.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  getClienteById: async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID del cliente debe ser un número válido',
      });
    }

    try {
      const cliente = await clienteModel.getById(id);

      if (!cliente) {
        return res.status(404).json({
          success: false,
          message: 'Cliente no encontrado',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Cliente encontrado exitosamente',
         cliente,
      });
    } catch (error) {
      console.error('❌ Error en getClienteById:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al buscar el cliente por ID',
      });
    }
  },

  /**
   * Crea un nuevo cliente.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  createCliente: async (req, res) => {
    // Validación del cuerpo de la solicitud
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El cuerpo de la solicitud no puede estar vacío',
      });
    }

    const { nombre, primer_apellido, segundo_apellido, fecha_nacimiento, sexo, codigo_postal, numero_telefono, correo, contrasena, puntos, id_membresia, activo } =
      req.body;

    try {
      // Verificar si el usuario ya existe por correo o número de teléfono
      let usuarioExistente = null;

      if (correo) {
        usuarioExistente = await usuarioModel.getByEmail(correo);
      }

      if (!usuarioExistente && numero_telefono) {
        usuarioExistente = await usuarioModel.getByPhoneNumber(numero_telefono);
      }

      let id_usuario;

      if (!usuarioExistente) {
        // Si el usuario no existe, crearlo
        const usuarioData = {
          nombre,
          primer_apellido,
          segundo_apellido,
          fecha_nacimiento,
          sexo,
          codigo_postal,
          numero_telefono,
          correo,
          contrasena,
        };

        const nuevoUsuario = await usuarioModel.create(usuarioData);
        id_usuario = nuevoUsuario.id_usuario;
      } else {
        // Si el usuario ya existe, usar su ID
        id_usuario = usuarioExistente.id_usuario;
      }

      // Crear el cliente
      const clienteData = {
        id_usuario,
        puntos,
        id_membresia,
        activo,
      };

      const nuevoCliente = await clienteModel.create(clienteData);

      res.status(201).json({
        success: true,
        message: 'Cliente creado exitosamente',
         nuevoCliente,
      });
    } catch (error) {
      console.error('❌ Error en createCliente:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al crear el cliente',
        error: error.message,
      });
    }
  },

  /**
   * Actualiza un cliente existente.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  patchCliente: async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID del cliente debe ser un número válido',
      });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Al menos un campo debe ser proporcionado para la actualización',
      });
    }

    try {
      const clienteExistente = await clienteModel.getById(id);

      if (!clienteExistente) {
        return res.status(404).json({
          success: false,
          message: 'Cliente no encontrado',
        });
      }

      // Asegurarse de que no se permita actualizar campos prohibidos
      const { id_usuario, id_cliente, ...datosActualizables } = req.body;

      const actualizado = await clienteModel.patch(id, datosActualizables);

      if (!actualizado) {
        return res.status(404).json({
          success: false,
          message: 'Cliente no encontrado',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Cliente actualizado exitosamente',
      });
    } catch (error) {
      console.error('❌ Error en patchCliente:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar el cliente',
      });
    }
  },

  /**
   * Elimina un cliente por su ID.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  deleteCliente: async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID del cliente debe ser un número válido',
      });
    }

    try {
      const eliminado = await clienteModel.delete(id);

      if (!eliminado) {
        return res.status(404).json({
          success: false,
          message: 'Cliente no encontrado',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Cliente eliminado exitosamente',
      });
    } catch (error) {
      console.error('❌ Error en deleteCliente:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar el cliente',
      });
    }
  },
};

export default clienteController;