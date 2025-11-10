import pool from "../config/pool.js";

const membresiaModel = {
  /**
   * Obtiene todas las membresías.
   * @returns {Promise<Array>} - Lista de membresías.
   */
  getAll: async () => {
    try {
      const [rows] = await pool.query('SELECT * FROM membresias');
      return rows;
    } catch (error) {
      console.error('❌ Error en getAll:', error.message);
      throw new Error('Error al obtener todas las membresías');
    }
  },

  /**
   * Obtiene una membresía por su ID.
   * @param {number} id - ID de la membresía.
   * @returns {Promise<Object|null>} - La membresía encontrada o null si no existe.
   */
  getById: async (id) => {
    try {
      const [rows] = await pool.query('SELECT * FROM membresias WHERE id_membresia = ?', [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('❌ Error en getById:', error.message);
      throw new Error('Error al buscar la membresía por ID');
    }
  },

  /**
   * Crea una nueva membresía.
   * @param {Object} membresiaData - Datos de la membresía a crear.
   * @returns {Promise<Object>} - La membresía creada.
   */
  create: async (membresiaData) => {
    try {
      const { nombre } = membresiaData;

      // Validar que el campo obligatorio esté presente
      if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
        throw new Error('El nombre de la membresía es obligatorio y debe ser una cadena de texto válida');
      }

      // Crear la membresía
      const [result] = await pool.query('INSERT INTO membresias (nombre) VALUES (?)', [nombre]);

      return { id_membresia: result.insertId, nombre };
    } catch (error) {
      console.error('❌ Error en create:', error.message);
      throw new Error('Error al crear la membresía');
    }
  },

  /**
   * Actualiza una membresía existente.
   * @param {number} id - ID de la membresía a actualizar.
   * @param {Object} membresiaData - Datos de la membresía a actualizar.
   * @returns {Promise<boolean>} - True si se actualizó correctamente, false si no se encontró la membresía.
   */
  patch: async (id, membresiaData) => {
    try {
      const { nombre } = membresiaData;

      // Construir dinámicamente la consulta de actualización
      const updates = [];
      const params = [];

      if (nombre !== undefined) {
        if (typeof nombre !== 'string' || nombre.trim() === '') {
          throw new Error('El nombre de la membresía debe ser una cadena de texto válida');
        }
        updates.push('nombre = ?');
        params.push(nombre);
      }

      if (updates.length === 0) {
        return false; // No hay campos para actualizar
      }

      params.push(id); // Añadir el ID al final de los parámetros
      const query = `UPDATE membresias SET ${updates.join(', ')} WHERE id_membresia = ?`;

      const [result] = await pool.query(query, params);
      return result.affectedRows > 0; // Retorna true si se actualizó al menos una fila
    } catch (error) {
      console.error('❌ Error en patch:', error.message);
      throw new Error('Error al actualizar la membresía');
    }
  },

  /**
   * Elimina una membresía por su ID.
   * @param {number} id - ID de la membresía a eliminar.
   * @returns {Promise<boolean>} - True si se eliminó correctamente, false si no se encontró la membresía.
   */
  delete: async (id) => {
    try {
      const [result] = await pool.query('DELETE FROM membresias WHERE id_membresia = ?', [id]);
      return result.affectedRows > 0; // Retorna true si se eliminó al menos una fila
    } catch (error) {
      console.error('❌ Error en delete:', error.message);
      throw new Error('Error al eliminar la membresía');
    }
  },
};

export default membresiaModel;