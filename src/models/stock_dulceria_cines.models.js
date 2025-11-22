import pool from '../config/pool.js';

const stockDulceriaCinesModel = {
    findAll: async () => {
        try {
            const [rows] = await pool.query('SELECT * FROM stock_dulceria_cines');
            return rows;
        } catch (error) {
            console.error('❌ Error en findAll:', error.message);
            throw new Error('Error al obtener todo el stock de dulcería en cines');
        }
    },

    findById: async (id) => {
        try {
            const [rows] = await pool.query('SELECT * FROM stock_dulceria_cines WHERE id_stock_dulceria = ?', [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('❌ Error en findById:', error.message);
            throw new Error('Error al buscar el stock por ID');
        }
    },

    create: async (data) => {
        try {
            const { id_cine, id_dulce } = data;
            const [result] = await pool.query(
                'INSERT INTO stock_dulceria_cines (id_cine, id_dulce) VALUES (?, ?)',
                [id_cine, id_dulce]
            );
            return { id_stock_dulceria: result.insertId, ...data };
        } catch (error) {
            console.error('❌ Error en create:', error.message);
            throw new Error('Error al crear el stock');
        }
    },

    patch: async (id, data) => {
        try {
            const updates = [];
            const params = [];

            if (data.id_cine !== undefined) { updates.push('id_cine = ?'); params.push(data.id_cine); }
            if (data.id_dulce !== undefined) { updates.push('id_dulce = ?'); params.push(data.id_dulce); }

            if (updates.length === 0) return false;

            params.push(id);
            const query = `UPDATE stock_dulceria_cines SET ${updates.join(', ')} WHERE id_stock_dulceria = ?`;

            const [result] = await pool.query(query, params);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('❌ Error en patch:', error.message);
            throw new Error('Error al actualizar el stock');
        }
    },

    delete: async (id) => {
        try {
            const [result] = await pool.query('DELETE FROM stock_dulceria_cines WHERE id_stock_dulceria = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('❌ Error en delete:', error.message);
            throw new Error('Error al eliminar el stock');
        }
    },
};

export default stockDulceriaCinesModel;
