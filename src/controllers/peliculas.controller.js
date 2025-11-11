import peliculaModel from "../models/peliculas.models.js";

/**
 * Controlador para manejar operaciones relacionadas con películas.
 */
const peliculaController = {
  /**
   * Obtiene todas las películas.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  getAllPeliculas: async (req, res) => {
    try {
      const peliculas = await peliculaModel.getAll();
      res.status(200).json({
        success: true,
        message: 'Lista de películas obtenida exitosamente',
         peliculas,
      });
    } catch (error) {
      console.error('❌ Error en getAllPeliculas:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al obtener la lista de películas',
      });
    }
  },

  /**
   * Obtiene una película por su ID.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  getPeliculaById: async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID de la película debe ser un número válido',
      });
    }

    try {
      const pelicula = await peliculaModel.getById(id);

      if (!pelicula) {
        return res.status(404).json({
          success: false,
          message: 'Película no encontrada',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Película encontrada exitosamente',
         pelicula,
      });
    } catch (error) {
      console.error('❌ Error en getPeliculaById:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al buscar la película por ID',
      });
    }
  },

  /**
   * Crea una nueva película.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  createPelicula: async (req, res) => {
    // Validación del cuerpo de la solicitud
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El cuerpo de la solicitud no puede estar vacío',
      });
    }

    const {
      nombre,
      url_portada,
      duracion,
      director,
      url_trailer,
      genero,
      estado_cartelera,
      fecha_inicio_estreno,
      fecha_fin_estreno,
      activo,
    } = req.body;

    // Validar campos obligatorios
    if (
      !nombre ||
      !url_portada ||
      !duracion ||
      !director ||
      !url_trailer ||
      !genero ||
      !estado_cartelera ||
      !fecha_inicio_estreno ||
      typeof activo !== 'boolean'
    ) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios y deben ser válidos',
      });
    }

    try {
      // Crear la película
      const nuevaPelicula = await peliculaModel.create({
        nombre,
        url_portada,
        duracion,
        director,
        url_trailer,
        genero,
        estado_cartelera,
        fecha_inicio_estreno,
        fecha_fin_estreno,
        activo,
      });

      res.status(201).json({
        success: true,
        message: 'Película creada exitosamente',
         nuevaPelicula,
      });
    } catch (error) {
      console.error('❌ Error en createPelicula:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al crear la película',
        error: error.message,
      });
    }
  },

  /**
   * Actualiza una película existente.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  patchPelicula: async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID de la película debe ser un número válido',
      });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Al menos un campo debe ser proporcionado para la actualización',
      });
    }

    try {
      const peliculaExistente = await peliculaModel.getById(id);

      if (!peliculaExistente) {
        return res.status(404).json({
          success: false,
          message: 'Película no encontrada',
        });
      }

      const actualizado = await peliculaModel.patch(id, req.body);

      if (!actualizado) {
        return res.status(404).json({
          success: false,
          message: 'Película no encontrada',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Película actualizada exitosamente',
      });
    } catch (error) {
      console.error('❌ Error en patchPelicula:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar la película',
      });
    }
  },

  /**
   * Elimina una película por su ID.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  deletePelicula: async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID de la película debe ser un número válido',
      });
    }

    try {
      const eliminado = await peliculaModel.delete(id);

      if (!eliminado) {
        return res.status(404).json({
          success: false,
          message: 'Película no encontrada',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Película eliminada exitosamente',
      });
    } catch (error) {
      console.error('❌ Error en deletePelicula:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar la película',
      });
    }
  },
};

export default peliculaController;