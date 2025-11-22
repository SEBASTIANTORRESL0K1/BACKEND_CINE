import pool from '../config/pool.js';

const categoriaDulceriaModel = {
  findAll: async () => {
    try {
      const [rows] = await pool.query('SELECT * FROM categoria_dulceria');
      return rows;
    } catch (error) {
      console.error('❌ Error en findAll:', error.message);
      throw new Error('Error al obtener todas las categorías de dulcería');
    }
  },

  findById: async (id) => {
    try {
      const [rows] = await pool.query('SELECT * FROM categoria_dulceria WHERE id_categoria_dulceria = ?', [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('❌ Error en findById:', error.message);
      throw new Error('Error al buscar la categoría de dulcería por ID');
    }
  },

  create: async (data) => {
    try {
      const { nombre } = data;
      const [result] = await pool.query(
        'INSERT INTO categoria_dulceria (nombre) VALUES (?)',
        [nombre]
      );
      return { id_categoria_dulceria: result.insertId, nombre };
    } catch (error) {
      console.error('❌ Error en create:', error.message);
      throw new Error('Error al crear la categoría de dulcería');
    }
  },

  patch: async (id, data) => {
    try {
      const updates = [];
      const params = [];

      if (data.nombre !== undefined) {
        updates.push('nombre = ?');
        params.push(data.nombre);
      }

      if (updates.length === 0) {
        return false;
      }

      params.push(id);
      const query = `UPDATE categoria_dulceria SET ${updates.join(', ')} WHERE id_categoria_dulceria = ?`;

      const [result] = await pool.query(query, params);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('❌ Error en patch:', error.message);
      throw new Error('Error al actualizar la categoría de dulcería');
    }
  },

  delete: async (id) => {
    try {
      const [result] = await pool.query('DELETE FROM categoria_dulceria WHERE id_categoria_dulceria = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('❌ Error en delete:', error.message);
      throw new Error('Error al eliminar la categoría de dulcería');
    }
  },
};

export default categoriaDulceriaModel;
