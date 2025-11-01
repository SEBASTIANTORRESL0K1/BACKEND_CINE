import pool from "../config/pool.js";

const asientoModel = {
  /**
   * Encuentra todos los asientos.
   * @returns {Promise<Array>} - Lista de asientos.
   */
  findAll: async () => {
    try {
      const [rows] = await pool.query('SELECT * FROM ASIENTOS');
      return rows;
    } catch (error) {
      console.error('❌ Error en findAll:', error.message);
      throw new Error('Error al obtener todos los asientos');
    }
  },

  /**
   * Encuentra un asiento por su ID.
   * @param {number} id - ID del asiento.
   * @returns {Promise<Object|null>} - El asiento encontrado o null si no existe.
   */
  findById: async (id) => {
    try {
      const [rows] = await pool.query('SELECT * FROM ASIENTOS WHERE id_asiento = ?', [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('❌ Error en findById:', error.message);
      throw new Error('Error al buscar el asiento por ID');
    }
  },

  /**
   * Encuentra todos los asientos asociados a una sala específica.
   * @param {number} salaId - ID de la sala.
   * @returns {Promise<Array>} - Lista de asientos asociados a la sala.
   */
findBySalaId: async (salaId) => {
  try {
    // if (typeof salaId !== 'number' || isNaN(salaId)) {
    //   throw new Error('El ID de la sala debe ser un número válido');
    // }

    const [rows] = await pool.query('SELECT * FROM ASIENTOS WHERE id_sala = ?', [salaId]);
    return rows;
  } catch (error) {
    console.error('❌ Error en findBySalaId:', error.message);
    throw new Error('Error al buscar asientos por ID de sala');
  }
},

  /**
   * Crea un nuevo asiento.
   * @param {Object} asientoData - Datos del asiento a crear.
   * @returns {Promise<Object>} - El asiento creado.
   */
  create: async (asientoData) => {
    try {
      const { fila_columna, id_sala } = asientoData;

      // Verificar si ya existe un asiento con la misma fila_columna e id_sala
      const [existingAsientos] = await pool.query(
        'SELECT * FROM ASIENTOS WHERE fila_columna = ? AND id_sala = ?',
        [fila_columna, id_sala]
      );

      if (existingAsientos.length > 0) {
        throw new Error('Ya existe un asiento con la misma fila y columna en esta sala');
      }

      // Crear el asiento
      const [result] = await pool.query(
        'INSERT INTO ASIENTOS (fila_columna, id_sala) VALUES (?, ?)',
        [fila_columna, id_sala]
      );

      return { id_asiento: result.insertId, fila_columna, id_sala };
    } catch (error) {
      console.error('❌ Error en create:', error.message);
      throw new Error('Error al crear el asiento');
    }
  },

  /**
   * Actualiza un asiento existente.
   * @param {number} id - ID del asiento a actualizar.
   * @param {Object} asientoData - Datos del asiento a actualizar.
   * @returns {Promise<boolean>} - True si se actualizó correctamente, false si no se encontró el asiento.
   */
  patch: async (id, asientoData) => {
    try {
      const { fila_columna, id_sala } = asientoData;

      // Si se proporciona fila_columna o id_sala, verificar que no exista otro asiento con esa combinación
      if (fila_columna || id_sala) {
        const [existingAsientos] = await pool.query(
          'SELECT * FROM ASIENTOS WHERE fila_columna = ? AND id_sala = ? AND id_asiento != ?',
          [fila_columna || null, id_sala || null, id]
        );

        if (existingAsientos.length > 0) {
          throw new Error('Ya existe un asiento con la misma fila y columna en esta sala');
        }
      }

      // Construir dinámicamente la consulta de actualización
      const updates = [];
      const params = [];

      if (fila_columna !== undefined) {
        updates.push('fila_columna = ?');
        params.push(fila_columna);
      }

      if (id_sala !== undefined) {
        updates.push('id_sala = ?');
        params.push(id_sala);
      }

      if (updates.length === 0) {
        return false; // No hay campos para actualizar
      }

      params.push(id); // Añadir el ID al final de los parámetros
      const query = `UPDATE ASIENTOS SET ${updates.join(', ')} WHERE id_asiento = ?`;

      const [result] = await pool.query(query, params);
      return result.affectedRows > 0; // Retorna true si se actualizó al menos una fila
    } catch (error) {
      console.error('❌ Error en patch:', error.message);
      throw new Error('Error al actualizar el asiento');
    }
  },

  /**
   * Elimina un asiento por su ID.
   * @param {number} id - ID del asiento a eliminar.
   * @returns {Promise<boolean>} - True si se eliminó correctamente, false si no se encontró el asiento.
   */
  delete: async (id) => {
    try {
      const [result] = await pool.query('DELETE FROM ASIENTOS WHERE id_asiento = ?', [id]);
      return result.affectedRows > 0; // Retorna true si se eliminó al menos una fila
    } catch (error) {
      console.error('❌ Error en delete:', error.message);
      throw new Error('Error al eliminar el asiento');
    }
  },
};

export default asientoModel;