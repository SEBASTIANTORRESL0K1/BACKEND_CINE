import asientoModel from "../models/asientos.models.js";

/**
 * Controlador para manejar operaciones relacionadas con asientos.
 */
const asientoController = {
  /**
   * Obtiene todos los asientos.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  getAllAsientos: async (req, res) => {
    try {
      const asientos = await asientoModel.findAll();
      res.status(200).json({
        success: true,
        message: 'Lista de asientos obtenida exitosamente',
        data: asientos,
      });
    } catch (error) {
      console.error('❌ Error en getAllAsientos:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al obtener la lista de asientos',
      });
    }
  },

  /**
   * Obtiene un asiento por su ID.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  getAsientoById: async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID del asiento debe ser un número válido',
      });
    }

    try {
      const asiento = await asientoModel.findById(id);

      if (!asiento) {
        return res.status(404).json({
          success: false,
          message: 'Asiento no encontrado',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Asiento encontrado exitosamente',
        data: asiento,
      });
    } catch (error) {
      console.error('❌ Error en getAsientoById:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al buscar el asiento por ID',
      });
    }
  },

  /**
   * Obtiene todos los asientos asociados a una sala específica.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
getAsientosBySalaId: async (req, res) => {

  const { id } = req.params;

  // Convertir id a número
  const salaId = Number(id);

  // Validar que sea un número válido
  if (isNaN(salaId)) {
    return res.status(400).json({
      success: false,
      message: 'El ID de la sala debe ser un número válido',
    });
  }

  try {
    const asientos = await asientoModel.findBySalaId(salaId);

    if (asientos.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron asientos para esta sala',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Asientos encontrados exitosamente',
      data: asientos,
    });
  } catch (error) {
    console.error('❌ Error en getAsientosBySalaId:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al buscar asientos por ID de sala',
    });
  }
},

  /**
   * Crea un nuevo asiento.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  createAsiento: async (req, res) => {
    // Validación del cuerpo de la solicitud
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El cuerpo de la solicitud no puede estar vacío',
      });
    }

    const { fila_columna, id_sala } = req.body;

    // Validación de campos obligatorios
    if (!fila_columna || !id_sala) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios',
      });
    }

    // Validación del campo fila_columna
    if (typeof fila_columna !== 'string' || fila_columna.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'La fila y columna del asiento deben ser una cadena de texto válida',
      });
    }

    // Validación del campo id_sala
    if (typeof id_sala !== 'number' || isNaN(id_sala)) {
      return res.status(400).json({
        success: false,
        message: 'El ID de la sala debe ser un número válido',
      });
    }

    try {
      // Crear el asiento
      const nuevoAsiento = await asientoModel.create({ fila_columna, id_sala });

      res.status(201).json({
        success: true,
        message: 'Asiento creado exitosamente',
        data: nuevoAsiento,
      });
    } catch (error) {
      console.error('❌ Error en createAsiento:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al crear el asiento',
        error: error.message,
      });
    }
  },

  /**
   * Actualiza un asiento existente.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  patchAsiento: async (req, res) => {
    const { id } = req.params;
    const { fila_columna, id_sala } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID del asiento debe ser un número válido',
      });
    }

    if ((!fila_columna && !id_sala) || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Al menos un campo (fila_columna o id_sala) debe ser proporcionado',
      });
    }

    if (fila_columna && (typeof fila_columna !== 'string' || fila_columna.trim() === '')) {
      return res.status(400).json({
        success: false,
        message: 'La fila y columna del asiento deben ser una cadena de texto válida',
      });
    }

    if (id_sala && (typeof id_sala !== 'number' || isNaN(id_sala))) {
      return res.status(400).json({
        success: false,
        message: 'El ID de la sala debe ser un número válido',
      });
    }

    try {
      const asientoExistente = await asientoModel.findById(id);
      if (!asientoExistente) {
        return res.status(404).json({
          success: false,
          message: 'Asiento no encontrado',
        });
      }

      const actualizado = await asientoModel.patch(id, { fila_columna, id_sala });

      if (!actualizado) {
        return res.status(404).json({
          success: false,
          message: 'Asiento no encontrado',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Asiento actualizado exitosamente',
      });
    } catch (error) {
      console.error('❌ Error en patchAsiento:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar el asiento',
      });
    }
  },

  /**
   * Elimina un asiento por su ID.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  deleteAsiento: async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID del asiento debe ser un número válido',
      });
    }

    try {
      const eliminado = await asientoModel.delete(id);

      if (!eliminado) {
        return res.status(404).json({
          success: false,
          message: 'Asiento no encontrado',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Asiento eliminado exitosamente',
      });
    } catch (error) {
      console.error('❌ Error en deleteAsiento:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar el asiento',
      });
    }
  },
};

export default asientoController;