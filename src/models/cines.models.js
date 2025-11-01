import pool from '../config/pool.js'; // Importa el pool de conexiones configurado

const cineModel = {
  /**
   * Encuentra todos los cines.
   * @returns {Promise<Array>} - Lista de cines.
   */
  findAll: async () => {
    try {
      const [rows] = await pool.query('SELECT * FROM CINES');
      return rows;
    } catch (error) {
      console.error('❌ Error en findAll:', error.message);
      throw new Error('Error al obtener todos los cines');
    }
  },

  /**
   * Encuentra un cine por su ID.
   * @param {number} id - ID del cine.
   * @returns {Promise<Object|null>} - El cine encontrado o null si no existe.
   */
  findById: async (id) => {
    try {
      const [rows] = await pool.query('SELECT * FROM CINES WHERE id_cine = ?', [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('❌ Error en findById:', error.message);
      throw new Error('Error al buscar el cine por ID');
    }
  },

  /**
   * Encuentra un cine por su nombre.
   * @param {string} nombre - Nombre del cine.
   * @returns {Promise<Array>} - Lista de cines que coinciden con el nombre.
   */
  findByName: async (nombre) => {
    try {
      const [rows] = await pool.query('SELECT * FROM CINES WHERE nombre_cine LIKE ?', [`%${nombre}%`]);
      return rows;
    } catch (error) {
      console.error('❌ Error en findByName:', error.message);
      throw new Error('Error al buscar cines por nombre');
    }
  },

  /**
   * Crea un nuevo cine.
   * @param {Object} cineData - Datos del cine a crear.
   * @returns {Promise<Object>} - El cine creado.
   */
  create: async (cineData) => {
    try {
      const { nombre_cine, codigo_postal } = cineData;
      const [result] = await pool.query(
        'INSERT INTO CINES (nombre_cine, codigo_postal) VALUES (?, ?)',
        [nombre_cine, codigo_postal]
      );
      return { id_cine: result.insertId, nombre_cine, codigo_postal };
    } catch (error) {
      console.error('❌ Error en create:', error.message);
      throw new Error('Error al crear el cine');
    }
  },

  /**
   * Actualiza un cine existente (solo permite modificar nombre_cine y codigo_postal).
   * @param {number} id - ID del cine a actualizar.
   * @param {Object} cineData - Datos del cine a actualizar.
   * @returns {Promise<boolean>} - True si se actualizó correctamente, false si no se encontró el cine.
   */
patch: async (id, cineData) => {
  try {
    // Eliminamos id_cine del objeto cineData para evitar su actualización
    delete cineData.id_cine;

    const updates = [];
    const params = [];

    if (cineData.nombre_cine !== undefined) {
      updates.push('nombre_cine = ?');
      params.push(cineData.nombre_cine);
    }

    if (cineData.codigo_postal !== undefined) {
      updates.push('codigo_postal = ?');
      params.push(cineData.codigo_postal);
    }

    // Si no hay campos para actualizar, retornamos false
    if (updates.length === 0) {
      return false;
    }

    params.push(id); // Añadimos el ID al final de los parámetros
    const query = `UPDATE CINES SET ${updates.join(', ')} WHERE id_cine = ?`;

    const [result] = await pool.query(query, params);
    return result.affectedRows > 0; // Retorna true si se actualizó al menos una fila
  } catch (error) {
    console.error('❌ Error en patch:', error.message);
    throw new Error('Error al actualizar el cine');
  }
},

  /**
   * Elimina un cine por su ID.
   * @param {number} id - ID del cine a eliminar.
   * @returns {Promise<boolean>} - True si se eliminó correctamente, false si no se encontró el cine.
   */
  delete: async (id) => {
    try {
      const [result] = await pool.query('DELETE FROM CINES WHERE id_cine = ?', [id]);
      return result.affectedRows > 0; // Retorna true si se eliminó al menos una fila
    } catch (error) {
      console.error('❌ Error en delete:', error.message);
      throw new Error('Error al eliminar el cine');
    }
  },
};

export default cineModel;