import pool from '../config/pool.js'; // Importa el pool de conexiones configurado

const salaModel = {
  /**
   * Encuentra todas las salas.
   * @returns {Promise<Array>} - Lista de salas.
   */
  findAll: async () => {
    try {
      const [rows] = await pool.query('SELECT * FROM SALAS');
      return rows;
    } catch (error) {
      console.error('❌ Error en findAll:', error.message);
      throw new Error('Error al obtener todas las salas');
    }
  },

  /**
   * Encuentra una sala por su ID.
   * @param {number} id - ID de la sala.
   * @returns {Promise<Object|null>} - La sala encontrada o null si no existe.
   */
  findById: async (id) => {
    try {
      const [rows] = await pool.query('SELECT * FROM SALAS WHERE id_sala = ?', [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('❌ Error en findById:', error.message);
      throw new Error('Error al buscar la sala por ID');
    }
  },

  /**
   * Encuentra todas las salas asociadas a un cine específico.
   * @param {number} cineId - ID del cine.
   * @returns {Promise<Array>} - Lista de salas asociadas al cine.
   */
  findByCineId: async (cineId) => {
    try {
      const [rows] = await pool.query('SELECT * FROM SALAS WHERE id_cine = ?', [cineId]);
      return rows;
    } catch (error) {
      console.error('❌ Error en findByCineId:', error.message);
      throw new Error('Error al buscar salas por ID de cine');
    }
  },

  /**
   * Crea una nueva sala.
   * @param {Object} salaData - Datos de la sala a crear.
   * @returns {Promise<Object>} - La sala creada.
   */
create: async (salaData) => {
  try {
    const { id_cine, numero_sala } = salaData;

    // Verificar si ya existe una sala con la misma combinación de id_cine y numero_sala
    const [existingSalas] = await pool.query(
      'SELECT * FROM SALAS WHERE id_cine = ? AND numero_sala = ?',
      [id_cine, numero_sala]
    );

    if (existingSalas.length > 0) {
      throw new Error('Ya existe una sala con este número en el cine especificado');
    }

    // Insertar la nueva sala
    const [result] = await pool.query(
      'INSERT INTO SALAS (id_cine, numero_sala) VALUES (?, ?)',
      [id_cine, numero_sala]
    );
    return { id_sala: result.insertId, id_cine, numero_sala };
  } catch (error) {
    console.error('❌ Error en create:', error.message);
    throw new Error(error.message);
  }
},

  /**
   * Actualiza una sala existente (permite modificar id_cine y numero_sala).
   * @param {number} id - ID de la sala a actualizar.
   * @param {Object} salaData - Datos de la sala a actualizar.
   * @returns {Promise<boolean>} - True si se actualizó correctamente, false si no se encontró la sala.
   */
  patch: async (id, salaData) => {
    try {
      const { id_cine, numero_sala } = salaData;
      const [result] = await pool.query(
        'UPDATE SALAS SET id_cine = ?, numero_sala = ? WHERE id_sala = ?',
        [id_cine, numero_sala, id]
      );
      return result.affectedRows > 0; // Retorna true si se actualizó al menos una fila
    } catch (error) {
      console.error('❌ Error en patch:', error.message);
      throw new Error('Error al actualizar la sala');
    }
  },

  /**
   * Elimina una sala por su ID.
   * @param {number} id - ID de la sala a eliminar.
   * @returns {Promise<boolean>} - True si se eliminó correctamente, false si no se encontró la sala.
   */
  delete: async (id) => {
    try {
      const [result] = await pool.query('DELETE FROM SALAS WHERE id_sala = ?', [id]);
      return result.affectedRows > 0; // Retorna true si se eliminó al menos una fila
    } catch (error) {
      console.error('❌ Error en delete:', error.message);
      throw new Error('Error al eliminar la sala');
    }
  },
};

export default salaModel;