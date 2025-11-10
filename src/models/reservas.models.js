import pool from "../config/pool.js";

const reservaModel = {
  /**
   * Obtiene todas las reservas.
   * @returns {Promise<Array>} - Lista de reservas.
   */
  getAll: async () => {
    try {
      const [rows] = await pool.query('SELECT * FROM reserva');
      return rows;
    } catch (error) {
      console.error('❌ Error en getAll:', error.message);
      throw new Error('Error al obtener todas las reservas');
    }
  },

  /**
   * Obtiene una reserva por su ID.
   * @param {number} id - ID de la reserva.
   * @returns {Promise<Object|null>} - La reserva encontrada o null si no existe.
   */
  getById: async (id) => {
    try {
      const [rows] = await pool.query('SELECT * FROM reserva WHERE id_reserva = ?', [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('❌ Error en getById:', error.message);
      throw new Error('Error al buscar la reserva por ID');
    }
  },

  /**
   * Crea una nueva reserva.
   * @param {Object} reservaData - Datos de la reserva a crear.
   * @returns {Promise<Object>} - La reserva creada.
   */
  create: async (reservaData) => {
    try {
      const { id_asiento, id_cliente, fecha } = reservaData;

      // Validar campos obligatorios
      if (!id_asiento || !id_cliente || !fecha) {
        throw new Error('Todos los campos son obligatorios');
      }

      // Validar que la fecha sea un formato válido
      const fechaValida = new Date(fecha);
      if (isNaN(fechaValida.getTime())) {
        throw new Error('La fecha proporcionada no es válida');
      }

      // Crear la reserva
      const [result] = await pool.query(
        'INSERT INTO reserva (id_asiento, id_cliente, fecha) VALUES (?, ?, ?)',
        [id_asiento, id_cliente, fecha]
      );

      return { id_reserva: result.insertId, id_asiento, id_cliente, fecha };
    } catch (error) {
      console.error('❌ Error en create:', error.message);
      throw new Error('Error al crear la reserva');
    }
  },

  /**
   * Actualiza una reserva existente.
   * @param {number} id - ID de la reserva a actualizar.
   * @param {Object} reservaData - Datos de la reserva a actualizar.
   * @returns {Promise<boolean>} - True si se actualizó correctamente, false si no se encontró la reserva.
   */
  patch: async (id, reservaData) => {
    try {
      const { id_asiento, id_cliente, fecha } = reservaData;

      // Construir dinámicamente la consulta de actualización
      const updates = [];
      const params = [];

      if (id_asiento !== undefined) {
        updates.push('id_asiento = ?');
        params.push(id_asiento);
      }

      if (id_cliente !== undefined) {
        updates.push('id_cliente = ?');
        params.push(id_cliente);
      }

      if (fecha !== undefined) {
        const fechaValida = new Date(fecha);
        if (isNaN(fechaValida.getTime())) {
          throw new Error('La fecha proporcionada no es válida');
        }
        updates.push('fecha = ?');
        params.push(fecha);
      }

      if (updates.length === 0) {
        return false; // No hay campos para actualizar
      }

      params.push(id); // Añadir el ID al final de los parámetros
      const query = `UPDATE reserva SET ${updates.join(', ')} WHERE id_reserva = ?`;

      const [result] = await pool.query(query, params);
      return result.affectedRows > 0; // Retorna true si se actualizó al menos una fila
    } catch (error) {
      console.error('❌ Error en patch:', error.message);
      throw new Error('Error al actualizar la reserva');
    }
  },

  /**
   * Elimina una reserva por su ID.
   * @param {number} id - ID de la reserva a eliminar.
   * @returns {Promise<boolean>} - True si se eliminó correctamente, false si no se encontró la reserva.
   */
  delete: async (id) => {
    try {
      const [result] = await pool.query('DELETE FROM reserva WHERE id_reserva = ?', [id]);
      return result.affectedRows > 0; // Retorna true si se eliminó al menos una fila
    } catch (error) {
      console.error('❌ Error en delete:', error.message);
      throw new Error('Error al eliminar la reserva');
    }
  },
};

export default reservaModel;