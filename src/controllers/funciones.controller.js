import funcionModel from "../models/funciones.models.js";
import peliculaModel from "../models/peliculas.models.js";
import salaModel from "../models/salas.models.js";

/**
 * Controlador para manejar operaciones relacionadas con funciones.
 */
const funcionController = {
  /**
   * Obtiene todas las funciones.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  getAllFunciones: async (req, res) => {
    try {
      const funciones = await funcionModel.getAll();
      res.status(200).json({
        success: true,
        message: 'Lista de funciones obtenida exitosamente',
         funciones,
      });
    } catch (error) {
      console.error('❌ Error en getAllFunciones:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al obtener la lista de funciones',
      });
    }
  },

  /**
   * Obtiene una función por su ID.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  getFuncionById: async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID de la función debe ser un número válido',
      });
    }

    try {
      const funcion = await funcionModel.getById(id);

      if (!funcion) {
        return res.status(404).json({
          success: false,
          message: 'Función no encontrada',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Función encontrada exitosamente',
         funcion,
      });
    } catch (error) {
      console.error('❌ Error en getFuncionById:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al buscar la función por ID',
      });
    }
  },

  /**
   * Crea una nueva función.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  createFuncion: async (req, res) => {
    // Validación del cuerpo de la solicitud
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El cuerpo de la solicitud no puede estar vacío',
      });
    }

    const { id_sala, id_pelicula, fecha_hora, precio } = req.body;

    // Validar campos obligatorios
    if (!id_sala || !id_pelicula || !fecha_hora || typeof precio !== 'number' || precio <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios y deben ser válidos',
      });
    }

    try {
      const sala = await salaModel.findById(id_sala);
      const pelicula = await peliculaModel.getById(id_pelicula);
      if (!sala || !pelicula) {
        return res.status(404).json({
          success: false,
          message: 'Sala o película no encontrada',
        });
      }
      // Crear la función
      const nuevaFuncion = await funcionModel.create({ id_sala, id_pelicula, fecha_hora, precio });

      res.status(201).json({
        success: true,
        message: 'Función creada exitosamente',
         nuevaFuncion,
      });
    } catch (error) {
      console.error('❌ Error en createFuncion:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al crear la función',
        error: error.message,
      });
    }
  },

  /**
   * Actualiza una función existente.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  patchFuncion: async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID de la función debe ser un número válido',
      });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Al menos un campo debe ser proporcionado para la actualización',
      });
    }

    try {
      const funcionExistente = await funcionModel.getById(id);

      if (!funcionExistente) {
        return res.status(404).json({
          success: false,
          message: 'Función no encontrada',
        });
      }

      const actualizado = await funcionModel.patch(id, req.body);

      if (!actualizado) {
        return res.status(404).json({
          success: false,
          message: 'Función no encontrada',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Función actualizada exitosamente',
      });
    } catch (error) {
      console.error('❌ Error en patchFuncion:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar la función',
      });
    }
  },

  /**
   * Elimina una función por su ID.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  deleteFuncion: async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID de la función debe ser un número válido',
      });
    }

    try {
      const eliminado = await funcionModel.delete(id);

      if (!eliminado) {
        return res.status(404).json({
          success: false,
          message: 'Función no encontrada',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Función eliminada exitosamente',
      });
    } catch (error) {
      console.error('❌ Error en deleteFuncion:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar la función',
      });
    }
  },
};

export default funcionController;