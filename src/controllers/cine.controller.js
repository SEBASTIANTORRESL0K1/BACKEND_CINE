import cineModel from '../models/cines.models.js';

/**
 * Controlador para manejar operaciones relacionadas con cines.
 */
const cineController = {
  /**
   * Obtiene todos los cines.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  getAllCines: async (req, res) => {
    try {
      const cines = await cineModel.findAll();
      res.status(200).json({
        success: true,
        message: 'Lista de cines obtenida exitosamente',
        data: cines,
      });
    } catch (error) {
      console.error('❌ Error en getAllCines:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al obtener la lista de cines',
      });
    }
  },

  /**
   * Obtiene un cine por su ID.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  getCineById: async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID del cine debe ser un número válido',
      });
    }

    try {
      const cine = await cineModel.findById(id);

      if (!cine) {
        return res.status(404).json({
          success: false,
          message: 'Cine no encontrado',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Cine encontrado exitosamente',
        data: cine,
      });
    } catch (error) {
      console.error('❌ Error en getCineById:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al buscar el cine por ID',
      });
    }
  },

  /**
   * Obtiene cines por nombre.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  getCinesByName: async (req, res) => {
    const { nombre } = req.query;

    if (!nombre || typeof nombre !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'El nombre del cine es obligatorio y debe ser una cadena de texto',
      });
    }

    try {
      const cines = await cineModel.findByName(nombre);

      if (cines.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No se encontraron cines con ese nombre',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Cines encontrados exitosamente',
        data: cines,
      });
    } catch (error) {
      console.error('❌ Error en getCinesByName:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al buscar cines por nombre',
      });
    }
  },

/**
 * Crea un nuevo cine.
 * @param {Object} req - Solicitud HTTP.
 * @param {Object} res - Respuesta HTTP.
 */
createCine: async (req, res) => {
  // Validación del cuerpo de la solicitud
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'El cuerpo de la solicitud no puede estar vacío',
    });
  }

  const { nombre_cine, codigo_postal } = req.body;

  // Validación de campos obligatorios
  if (!nombre_cine || !codigo_postal) {
    return res.status(400).json({
      success: false,
      message: 'Todos los campos son obligatorios',
    });
  }

  // Validación del campo nombre_cine
  if (typeof nombre_cine !== 'string' || nombre_cine.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'El nombre del cine debe ser una cadena de texto válida',
    });
  }

  // Validación del campo codigo_postal
  if (typeof codigo_postal !== 'string' || codigo_postal.length !== 5 || !/^\d+$/.test(codigo_postal)) {
    return res.status(400).json({
      success: false,
      message: 'El código postal debe ser una cadena de exactamente 5 dígitos',
    });
  }

  // Verificar si se intenta insertar en campos incorrectos
  const camposPermitidos = ['nombre_cine', 'codigo_postal'];
  const camposRecibidos = Object.keys(req.body);
  const camposIncorrectos = camposRecibidos.filter((campo) => !camposPermitidos.includes(campo));

  if (camposIncorrectos.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Campos no permitidos: ${camposIncorrectos.join(', ')}`,
    });
  }

  try {
    // Verificar si ya existe un cine con el mismo nombre
    const existingCine = await cineModel.findByName(nombre_cine);
    if (existingCine.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Ya existe un cine con ese nombre',
      });
    }

    // Crear el cine
    const nuevoCine = await cineModel.create({ nombre_cine, codigo_postal });

    res.status(201).json({
      success: true,
      message: 'Cine creado exitosamente',
      data: nuevoCine,
    });
  } catch (error) {
    console.error('❌ Error en createCine:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al crear el cine',
    });
  }
},

  /**
   * Actualiza un cine existente.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  updateCine: async (req, res) => {
    const { id } = req.params;
    const { nombre_cine, codigo_postal } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID del cine debe ser un número válido',
      });
    }

    if ((!nombre_cine && !codigo_postal) || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Al menos un campo (nombre_cine o codigo_postal) debe ser proporcionado',
      });
    }

    if (nombre_cine && (typeof nombre_cine !== 'string' || nombre_cine.trim() === '')) {
      return res.status(400).json({
        success: false,
        message: 'El nombre del cine debe ser una cadena de texto válida',
      });
    }

    if (codigo_postal && (codigo_postal.length !== 5 || !/^\d+$/.test(codigo_postal))) {
      return res.status(400).json({
        success: false,
        message: 'El código postal debe ser una cadena de exactamente 5 dígitos',
      });
    }

    try {
      const cineExistente = await cineModel.findById(id);
      if (!cineExistente) {
        return res.status(404).json({
          success: false,
          message: 'Cine no encontrado',
        });
      }

      const actualizado = await cineModel.patch(id, { nombre_cine, codigo_postal });

      if (!actualizado) {
        return res.status(404).json({
          success: false,
          message: 'Cine no encontrado',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Cine actualizado exitosamente',
      });
    } catch (error) {
      console.error('❌ Error en updateCine:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar el cine',
      });
    }
  },

  /**
   * Elimina un cine por su ID.
   * @param {Object} req - Solicitud HTTP.
   * @param {Object} res - Respuesta HTTP.
   */
  deleteCine: async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'El ID del cine debe ser un número válido',
      });
    }

    try {
      const eliminado = await cineModel.delete(id);

      if (!eliminado) {
        return res.status(404).json({
          success: false,
          message: 'Cine no encontrado',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Cine eliminado exitosamente',
      });
    } catch (error) {
      console.error('❌ Error en deleteCine:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar el cine',
      });
    }
  },
};

export default cineController;