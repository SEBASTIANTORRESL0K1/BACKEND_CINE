import pool from "../config/pool.js";

const funcionModel = {
  /**
   * Obtiene todas las funciones.
   * @returns {Promise<Array>} - Lista de funciones.
   */
  getAll: async () => {
    try {
      const [rows] = await pool.query('SELECT * FROM funciones');
      return rows;
    } catch (error) {
      console.error('❌ Error en getAll:', error.message);
      throw new Error('Error al obtener todas las funciones');
    }
  },

  /**
   * Obtiene una función por su ID.
   * @param {number} id - ID de la función.
   * @returns {Promise<Object|null>} - La función encontrada o null si no existe.
   */
  getById: async (id) => {
    try {
      const [rows] = await pool.query('SELECT * FROM funciones WHERE id_funcion = ?', [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('❌ Error en getById:', error.message);
      throw new Error('Error al buscar la función por ID');
    }
  },

  /**
   * Crea una nueva función.
   * @param {Object} funcionData - Datos de la función a crear.
   * @returns {Promise<Object>} - La función creada.
   */
  create: async (funcionData) => {
    try {
      const { id_sala, id_pelicula, fecha_hora, precio } = funcionData;

      // Validar campos obligatorios
      if (!id_sala || !id_pelicula || !fecha_hora || typeof precio !== 'number' || precio <= 0) {
        throw new Error('Todos los campos son obligatorios y deben ser válidos');
      }

      // Validar que la fecha_hora sea válida y convertir al formato MySQL DATETIME
      const fechaValida = new Date(fecha_hora);
      if (isNaN(fechaValida.getTime())) {
        throw new Error('La fecha y hora proporcionadas no son válidas');
      }
      const fechaFormateada = fechaValida.toISOString().slice(0, 19).replace('T', ' ');

      // Crear la función
      const [result] = await pool.query(
        'INSERT INTO funciones (id_sala, id_pelicula, fecha_hora, precio) VALUES (?, ?, ?, ?)',
        [id_sala, id_pelicula, fechaFormateada, precio]
      );

      return { id_funcion: result.insertId, ...funcionData };
    } catch (error) {
      console.error('❌ Error en create:', error.message);
      throw new Error('Error al crear la función');
    }
  },

  /**
   * Actualiza una función existente.
   * @param {number} id - ID de la función a actualizar.
   * @param {Object} funcionData - Datos de la función a actualizar.
   * @returns {Promise<boolean>} - True si se actualizó correctamente, false si no se encontró la función.
   */
  patch: async (id, funcionData) => {
    try {
      const updates = [];
      const params = [];

      for (const key of ['id_sala', 'id_pelicula', 'fecha_hora', 'precio']) {
        if (funcionData[key] !== undefined) {
          updates.push(`${key} = ?`);
          params.push(funcionData[key]);
        }
      }

      if (updates.length === 0) {
        return false; // No hay campos para actualizar
      }

      params.push(id); // Añadir el ID al final de los parámetros
      const query = `UPDATE funciones SET ${updates.join(', ')} WHERE id_funcion = ?`;

      const [result] = await pool.query(query, params);
      return result.affectedRows > 0; // Retorna true si se actualizó al menos una fila
    } catch (error) {
      console.error('❌ Error en patch:', error.message);
      throw new Error('Error al actualizar la función');
    }
  },

  /**
   * Elimina una función por su ID.
   * @param {number} id - ID de la función a eliminar.
   * @returns {Promise<boolean>} - True si se eliminó correctamente, false si no se encontró la función.
   */
  delete: async (id) => {
    try {
      const [result] = await pool.query('DELETE FROM funciones WHERE id_funcion = ?', [id]);
      return result.affectedRows > 0; // Retorna true si se eliminó al menos una fila
    } catch (error) {
      console.error('❌ Error en delete:', error.message);
      throw new Error('Error al eliminar la función');
    }
  },
};

export default funcionModel;