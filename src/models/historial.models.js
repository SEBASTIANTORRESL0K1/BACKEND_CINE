import pool from '../config/pool.js';

const historialModel = {
    findAll: async () => {
        try {
            const [rows] = await pool.query('SELECT * FROM historial');
            return rows;
        } catch (error) {
            console.error('❌ Error en findAll:', error.message);
            throw new Error('Error al obtener el historial');
        }
    },

    findById: async (id) => {
        try {
            const [rows] = await pool.query('SELECT * FROM historial WHERE id_historial = ?', [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('❌ Error en findById:', error.message);
            throw new Error('Error al buscar el registro de historial por ID');
        }
    },

    create: async (data) => {
        try {
            // Note: Handling potential column name discrepancies from schema (spaces) by using standard names.
            // If the DB has spaces, this might need adjustment, but standardizing is safer for now.
            const { id_usuario, ip, tipo_movimiento, descripcion, tabla_afectada, id_registro_afectado, exito, origen } = data;
            const [result] = await pool.query(
                'INSERT INTO historial (id_usuario, ip, tipo_movimiento, descripcion, tabla_afectada, id_registro_afectado, exito, origen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [id_usuario, ip, tipo_movimiento, descripcion, tabla_afectada, id_registro_afectado, exito, origen]
            );
            return { id_historial: result.insertId, ...data };
        } catch (error) {
            console.error('❌ Error en create:', error.message);
            // Fallback for potential column name issues if the previous query failed due to "Unknown column"
            if (error.message.includes("Unknown column")) {
                console.warn("Retrying with quoted column names containing spaces as per schema...");
                try {
                    const { id_usuario, ip, tipo_movimiento, descripcion, tabla_afectada, id_registro_afectado, exito, origen } = data;
                    const [result] = await pool.query(
                        'INSERT INTO historial (id_usuario, ip, tipo_movimiento, `  descripcion`, ` tabla_afectada`, id_registro_afectado, exito, origen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                        [id_usuario, ip, tipo_movimiento, descripcion, tabla_afectada, id_registro_afectado, exito, origen]
                    );
                    return { id_historial: result.insertId, ...data };
                } catch (retryError) {
                    throw new Error('Error al crear el registro de historial (reintento fallido)');
                }
            }
            throw new Error('Error al crear el registro de historial');
        }
    },

    patch: async (id, data) => {
        try {
            const updates = [];
            const params = [];

            if (data.id_usuario !== undefined) { updates.push('id_usuario = ?'); params.push(data.id_usuario); }
            if (data.ip !== undefined) { updates.push('ip = ?'); params.push(data.ip); }
            if (data.tipo_movimiento !== undefined) { updates.push('tipo_movimiento = ?'); params.push(data.tipo_movimiento); }
            if (data.descripcion !== undefined) { updates.push('descripcion = ?'); params.push(data.descripcion); }
            if (data.tabla_afectada !== undefined) { updates.push('tabla_afectada = ?'); params.push(data.tabla_afectada); }
            if (data.id_registro_afectado !== undefined) { updates.push('id_registro_afectado = ?'); params.push(data.id_registro_afectado); }
            if (data.exito !== undefined) { updates.push('exito = ?'); params.push(data.exito); }
            if (data.origen !== undefined) { updates.push('origen = ?'); params.push(data.origen); }

            if (updates.length === 0) return false;

            params.push(id);
            const query = `UPDATE historial SET ${updates.join(', ')} WHERE id_historial = ?`;

            const [result] = await pool.query(query, params);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('❌ Error en patch:', error.message);
            throw new Error('Error al actualizar el registro de historial');
        }
    },

    delete: async (id) => {
        try {
            const [result] = await pool.query('DELETE FROM historial WHERE id_historial = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('❌ Error en delete:', error.message);
            throw new Error('Error al eliminar el registro de historial');
        }
    },
};

export default historialModel;
