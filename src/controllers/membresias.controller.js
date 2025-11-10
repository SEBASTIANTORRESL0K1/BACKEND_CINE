import membresiaModel from "../models/membresias.models.js";

/**
 * Controlador para manejar operaciones relacionadas con membresías.
 */
const membresiaController = {
  /**
   * Obtiene todas las membresías.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  getAllMembresias: async (req, res) => {
    try {
      const membresias = await membresiaModel.getAll();
      res.status(200).json({
        success: true,
        message: 'Lista de membresías obtenida exitosamente',
        data: membresias,
      });
    } catch (error) {
      console.error('❌ Error en getAllMembresias:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al obtener la lista de membresías',
      });
    }
  },

  /**
   * Obtiene una membresía por su ID.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  getMembresiaById: async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID de la membresía debe ser un número válido',
      });
    }

    try {
      const membresia = await membresiaModel.getById(id);

      if (!membresia) {
        return res.status(404).json({
          success: false,
          message: 'Membresía no encontrada',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Membresía encontrada exitosamente',
         membresia,
      });
    } catch (error) {
      console.error('❌ Error en getMembresiaById:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al buscar la membresía por ID',
      });
    }
  },

  /**
   * Crea una nueva membresía.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  createMembresia: async (req, res) => {
    // Validación del cuerpo de la solicitud
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El cuerpo de la solicitud no puede estar vacío',
      });
    }

    const { nombre } = req.body;

    // Validación del campo obligatorio
    if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'El nombre de la membresía es obligatorio y debe ser una cadena de texto válida',
      });
    }

    try {
      // Crear la membresía
      const nuevaMembresia = await membresiaModel.create({ nombre });

      res.status(201).json({
        success: true,
        message: 'Membresía creada exitosamente',
         nuevaMembresia,
      });
    } catch (error) {
      console.error('❌ Error en createMembresia:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al crear la membresía',
        error: error.message,
      });
    }
  },

  /**
   * Actualiza una membresía existente.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  patchMembresia: async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID de la membresía debe ser un número válido',
      });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Al menos un campo debe ser proporcionado para la actualización',
      });
    }

    try {
      const membresiaExistente = await membresiaModel.getById(id);
      if (!membresiaExistente) {
        return res.status(404).json({
          success: false,
          message: 'Membresía no encontrada',
        });
      }

      const actualizado = await membresiaModel.patch(id, req.body);

      if (!actualizado) {
        return res.status(404).json({
          success: false,
          message: 'Membresía no encontrada',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Membresía actualizada exitosamente',
      });
    } catch (error) {
      console.error('❌ Error en patchMembresia:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar la membresía',
      });
    }
  },

  /**
   * Elimina una membresía por su ID.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  deleteMembresia: async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID de la membresía debe ser un número válido',
      });
    }

    try {
      const eliminado = await membresiaModel.delete(id);

      if (!eliminado) {
        return res.status(404).json({
          success: false,
          message: 'Membresía no encontrada',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Membresía eliminada exitosamente',
      });
    } catch (error) {
      console.error('❌ Error en deleteMembresia:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar la membresía',
      });
    }
  },
};

export default membresiaController;