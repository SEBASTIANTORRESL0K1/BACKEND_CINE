import pool from '../config/pool.js';

const detalleVentaModel = {
    findAll: async () => {
        try {
            const [rows] = await pool.query('SELECT * FROM detalle_venta');
            return rows;
        } catch (error) {
            console.error('❌ Error en findAll:', error.message);
            throw new Error('Error al obtener todos los detalles de venta');
        }
    },

    findById: async (id) => {
        try {
            const [rows] = await pool.query('SELECT * FROM detalle_venta WHERE id_detalle_venta = ?', [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('❌ Error en findById:', error.message);
            throw new Error('Error al buscar el detalle de venta por ID');
        }
    },

    create: async (data) => {
        try {
            const { id_venta, cantidad, precio, id_funcion, id_asiento, id_dulce, tipo_item, subtotal } = data;
            const [result] = await pool.query(
                'INSERT INTO detalle_venta (id_venta, cantidad, precio, id_funcion, id_asiento, id_dulce, tipo_item, subtotal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [id_venta, cantidad, precio, id_funcion, id_asiento, id_dulce, tipo_item, subtotal]
            );
            return { id_detalle_venta: result.insertId, ...data };
        } catch (error) {
            console.error('❌ Error en create:', error.message);
            throw new Error('Error al crear el detalle de venta');
        }
    },

    patch: async (id, data) => {
        try {
            const updates = [];
            const params = [];

            if (data.id_venta !== undefined) { updates.push('id_venta = ?'); params.push(data.id_venta); }
            if (data.cantidad !== undefined) { updates.push('cantidad = ?'); params.push(data.cantidad); }
            if (data.precio !== undefined) { updates.push('precio = ?'); params.push(data.precio); }
            if (data.id_funcion !== undefined) { updates.push('id_funcion = ?'); params.push(data.id_funcion); }
            if (data.id_asiento !== undefined) { updates.push('id_asiento = ?'); params.push(data.id_asiento); }
            if (data.id_dulce !== undefined) { updates.push('id_dulce = ?'); params.push(data.id_dulce); }
            if (data.tipo_item !== undefined) { updates.push('tipo_item = ?'); params.push(data.tipo_item); }
            if (data.subtotal !== undefined) { updates.push('subtotal = ?'); params.push(data.subtotal); }

            if (updates.length === 0) return false;

            params.push(id);
            const query = `UPDATE detalle_venta SET ${updates.join(', ')} WHERE id_detalle_venta = ?`;

            const [result] = await pool.query(query, params);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('❌ Error en patch:', error.message);
            throw new Error('Error al actualizar el detalle de venta');
        }
    },

    delete: async (id) => {
        try {
            const [result] = await pool.query('DELETE FROM detalle_venta WHERE id_detalle_venta = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('❌ Error en delete:', error.message);
            throw new Error('Error al eliminar el detalle de venta');
        }
    },
};

export default detalleVentaModel;
