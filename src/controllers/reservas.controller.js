import reservaModel from "../models/reservas.models.js";
import clienteModel from "../models/clientes.models.js";
import asientoModel from "../models/asientos.models.js";

/**
 * Controlador para manejar operaciones relacionadas con reservas.
 */
const reservaController = {
  /**
   * Obtiene todas las reservas.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  getAllReservas: async (req, res) => {
    try {
      const reservas = await reservaModel.getAll();
      res.status(200).json({
        success: true,
        message: 'Lista de reservas obtenida exitosamente',
         reservas,
      });
    } catch (error) {
      console.error('❌ Error en getAllReservas:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al obtener la lista de reservas',
      });
    }
  },

  /**
   * Obtiene una reserva por su ID.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  getReservaById: async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID de la reserva debe ser un número válido',
      });
    }

    try {
      const reserva = await reservaModel.getById(id);

      if (!reserva) {
        return res.status(404).json({
          success: false,
          message: 'Reserva no encontrada',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Reserva encontrada exitosamente',
         reserva,
      });
    } catch (error) {
      console.error('❌ Error en getReservaById:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al buscar la reserva por ID',
      });
    }
  },

  /**
   * Crea una nueva reserva.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  createReserva: async (req, res) => {
    // Validación del cuerpo de la solicitud
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El cuerpo de la solicitud no puede estar vacío',
      });
    }

    const { id_asiento, id_cliente, fecha } = req.body;

    // Validar campos obligatorios
    if (!id_asiento || !id_cliente || !fecha) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios',
      });
    }

    try {
      // Verificar si el cliente existe
      const clienteExistente = await clienteModel.getById(id_cliente);
      if (!clienteExistente) {
        return res.status(404).json({
          success: false,
          message: 'El cliente no existe',
        });
      }

      // Verificar si el asiento existe
      const asientoExistente = await asientoModel.findById(id_asiento);
      if (!asientoExistente) {
        return res.status(404).json({
          success: false,
          message: 'El asiento no existe',
        });
      }

      // Crear la reserva
      const nuevaReserva = await reservaModel.create({ id_asiento, id_cliente, fecha });

      res.status(201).json({
        success: true,
        message: 'Reserva creada exitosamente',
         nuevaReserva,
      });
    } catch (error) {
      console.error('❌ Error en createReserva:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al crear la reserva',
        error: error.message,
      });
    }
  },

  /**
   * Actualiza una reserva existente.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  patchReserva: async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID de la reserva debe ser un número válido',
      });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Al menos un campo debe ser proporcionado para la actualización',
      });
    }

    try {
      const reservaExistente = await reservaModel.getById(id);

      if (!reservaExistente) {
        return res.status(404).json({
          success: false,
          message: 'Reserva no encontrada',
        });
      }

      const { id_asiento, id_cliente } = req.body;

      // Si se proporciona un nuevo id_asiento, verificar si existe
      if (id_asiento !== undefined) {
        const asientoExistente = await asientoModel.findById(id_asiento);
        if (!asientoExistente) {
          return res.status(404).json({
            success: false,
            message: 'El asiento no existe',
          });
        }
      }

      // Si se proporciona un nuevo id_cliente, verificar si existe
      if (id_cliente !== undefined) {
        const clienteExistente = await clienteModel.getById(id_cliente);
        if (!clienteExistente) {
          return res.status(404).json({
            success: false,
            message: 'El cliente no existe',
          });
        }
      }

      const actualizado = await reservaModel.patch(id, req.body);

      if (!actualizado) {
        return res.status(404).json({
          success: false,
          message: 'Reserva no encontrada',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Reserva actualizada exitosamente',
      });
    } catch (error) {
      console.error('❌ Error en patchReserva:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar la reserva',
      });
    }
  },

  /**
   * Elimina una reserva por su ID.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  deleteReserva: async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID de la reserva debe ser un número válido',
      });
    }

    try {
      const eliminado = await reservaModel.delete(id);

      if (!eliminado) {
        return res.status(404).json({
          success: false,
          message: 'Reserva no encontrada',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Reserva eliminada exitosamente',
      });
    } catch (error) {
      console.error('❌ Error en deleteReserva:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar la reserva',
      });
    }
  },
};

export default reservaController;