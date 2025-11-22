import pool from '../config/pool.js';

const dulceriaModel = {
    findAll: async () => {
        try {
            const [rows] = await pool.query('SELECT * FROM dulceria');
            return rows;
        } catch (error) {
            console.error('❌ Error en findAll:', error.message);
            throw new Error('Error al obtener todos los dulces');
        }
    },

    findById: async (id) => {
        try {
            const [rows] = await pool.query('SELECT * FROM dulceria WHERE id_dulce = ?', [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('❌ Error en findById:', error.message);
            throw new Error('Error al buscar el dulce por ID');
        }
    },

    create: async (data) => {
        try {
            const { nombre, tamano, tipo, id_categoria_dulceria, precio } = data;
            const [result] = await pool.query(
                'INSERT INTO dulceria (nombre, tamano, tipo, id_categoria_dulceria, precio) VALUES (?, ?, ?, ?, ?)',
                [nombre, tamano, tipo, id_categoria_dulceria, precio]
            );
            return { id_dulce: result.insertId, ...data };
        } catch (error) {
            console.error('❌ Error en create:', error.message);
            throw new Error('Error al crear el dulce');
        }
    },

    patch: async (id, data) => {
        try {
            const updates = [];
            const params = [];

            if (data.nombre !== undefined) { updates.push('nombre = ?'); params.push(data.nombre); }
            if (data.tamano !== undefined) { updates.push('tamano = ?'); params.push(data.tamano); }
            if (data.tipo !== undefined) { updates.push('tipo = ?'); params.push(data.tipo); }
            if (data.id_categoria_dulceria !== undefined) { updates.push('id_categoria_dulceria = ?'); params.push(data.id_categoria_dulceria); }
            if (data.precio !== undefined) { updates.push('precio = ?'); params.push(data.precio); }

            if (updates.length === 0) return false;

            params.push(id);
            const query = `UPDATE dulceria SET ${updates.join(', ')} WHERE id_dulce = ?`;

            const [result] = await pool.query(query, params);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('❌ Error en patch:', error.message);
            throw new Error('Error al actualizar el dulce');
        }
    },

    delete: async (id) => {
        try {
            const [result] = await pool.query('DELETE FROM dulceria WHERE id_dulce = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('❌ Error en delete:', error.message);
            throw new Error('Error al eliminar el dulce');
        }
    },
};

export default dulceriaModel;
