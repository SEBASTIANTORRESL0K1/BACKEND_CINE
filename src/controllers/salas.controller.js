import salaModel from "../models/salas.models.js";

/**
 * Controlador para manejar operaciones relacionadas con salas.
 */
const salaController = {
  /**
   * Obtiene todas las salas.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  getAllSalas: async (req, res) => {
    try {
      const salas = await salaModel.findAll();
      res.status(200).json({
        success: true,
        message: 'Lista de salas obtenida exitosamente',
        data: salas,
      });
    } catch (error) {
      console.error('❌ Error en getAllSalas:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al obtener la lista de salas',
      });
    }
  },

  /**
   * Obtiene una sala por su ID.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  getSalaById: async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID de la sala debe ser un número válido',
      });
    }

    try {
      const sala = await salaModel.findById(id);

      if (!sala) {
        return res.status(404).json({
          success: false,
          message: 'Sala no encontrada',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Sala encontrada exitosamente',
        data: sala,
      });
    } catch (error) {
      console.error('❌ Error en getSalaById:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al buscar la sala por ID',
      });
    }
  },

  /**
   * Obtiene todas las salas asociadas a un cine específico.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  getSalasByCineId: async (req, res) => {
    const { id_cine } = req.params;

    if (!id_cine || isNaN(id_cine)) {
      return res.status(400).json({
        success: false,
        message: 'El ID del cine debe ser un número válido',
      });
    }

    try {
      const salas = await salaModel.findByCineId(id_cine);

      if (salas.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No se encontraron salas para este cine',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Salas encontradas exitosamente',
        data: salas,
      });
    } catch (error) {
      console.error('❌ Error en getSalasByCineId:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al buscar salas por ID de cine',
      });
    }
  },

  /**
   * Crea una nueva sala.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  createSala: async (req, res) => {
    // Validación del cuerpo de la solicitud
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El cuerpo de la solicitud no puede estar vacío',
      });
    }

    const { id_cine, numero_sala } = req.body;

    // Validación de campos obligatorios
    if (!id_cine || !numero_sala) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios',
      });
    }

    // Validación del campo id_cine
    if (typeof id_cine !== 'number' || isNaN(id_cine)) {
      return res.status(400).json({
        success: false,
        message: 'El ID del cine debe ser un número válido',
      });
    }

    // Validación del campo numero_sala
    if (typeof numero_sala !== 'string' || numero_sala.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'El número de sala debe ser una cadena de texto válida',
      });
    }

    try {
      // Crear la sala
      const nuevaSala = await salaModel.create({ id_cine, numero_sala });

      res.status(201).json({
        success: true,
        message: 'Sala creada exitosamente',
        data: nuevaSala,
      });
    } catch (error) {
      console.error('❌ Error en createSala:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al crear la sala', 
        error: error.message
      });
    }
  },

  /**
   * Actualiza una sala existente.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  patchSala: async (req, res) => {
    const { id } = req.params;
    const { id_cine, numero_sala } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID de la sala debe ser un número válido',
      });
    }

    if ((!id_cine && !numero_sala) || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Al menos un campo (id_cine o numero_sala) debe ser proporcionado',
      });
    }

    if (id_cine && (typeof id_cine !== 'number' || isNaN(id_cine))) {
      return res.status(400).json({
        success: false,
        message: 'El ID del cine debe ser un número válido',
      });
    }

    if (numero_sala && (typeof numero_sala !== 'string' || numero_sala.trim() === '')) {
      return res.status(400).json({
        success: false,
        message: 'El número de sala debe ser una cadena de texto válida',
      });
    }

    try {
      const salaExistente = await salaModel.findById(id);
      if (!salaExistente) {
        return res.status(404).json({
          success: false,
          message: 'Sala no encontrada',
        });
      }

      const actualizado = await salaModel.patch(id, { id_cine, numero_sala });

      if (!actualizado) {
        return res.status(404).json({
          success: false,
          message: 'Sala no encontrada',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Sala actualizada exitosamente',
      });
    } catch (error) {
      console.error('❌ Error en patchSala:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar la sala',
      });
    }
  },

  /**
   * Elimina una sala por su ID.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  deleteSala: async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID de la sala debe ser un número válido',
      });
    }

    try {
      const eliminado = await salaModel.delete(id);

      if (!eliminado) {
        return res.status(404).json({
          success: false,
          message: 'Sala no encontrada',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Sala eliminada exitosamente',
      });
    } catch (error) {
      console.error('❌ Error en deleteSala:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar la sala',
      });
    }
  },
};

export default salaController;