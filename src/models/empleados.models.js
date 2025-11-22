import pool from '../config/pool.js';

const empleadosModel = {
    findAll: async () => {
        try {
            const [rows] = await pool.query('SELECT * FROM empleados');
            return rows;
        } catch (error) {
            console.error('❌ Error en findAll:', error.message);
            throw new Error('Error al obtener todos los empleados');
        }
    },

    findById: async (id) => {
        try {
            const [rows] = await pool.query('SELECT * FROM empleados WHERE id_empleado = ?', [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('❌ Error en findById:', error.message);
            throw new Error('Error al buscar el empleado por ID');
        }
    },

    create: async (data) => {
        try {
            const { id_usuario, fecha_contratacion, activo, rol } = data;
            const [result] = await pool.query(
                'INSERT INTO empleados (id_usuario, fecha_contratacion, activo, rol) VALUES (?, ?, ?, ?)',
                [id_usuario, fecha_contratacion, activo, rol]
            );
            return { id_empleado: result.insertId, ...data };
        } catch (error) {
            console.error('❌ Error en create:', error.message);
            throw new Error('Error al crear el empleado');
        }
    },

    patch: async (id, data) => {
        try {
            const updates = [];
            const params = [];

            if (data.id_usuario !== undefined) { updates.push('id_usuario = ?'); params.push(data.id_usuario); }
            if (data.fecha_contratacion !== undefined) { updates.push('fecha_contratacion = ?'); params.push(data.fecha_contratacion); }
            if (data.activo !== undefined) { updates.push('activo = ?'); params.push(data.activo); }
            if (data.rol !== undefined) { updates.push('rol = ?'); params.push(data.rol); }

            if (updates.length === 0) return false;

            params.push(id);
            const query = `UPDATE empleados SET ${updates.join(', ')} WHERE id_empleado = ?`;

            const [result] = await pool.query(query, params);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('❌ Error en patch:', error.message);
            throw new Error('Error al actualizar el empleado');
        }
    },

    delete: async (id) => {
        try {
            const [result] = await pool.query('DELETE FROM empleados WHERE id_empleado = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('❌ Error en delete:', error.message);
            throw new Error('Error al eliminar el empleado');
        }
    },
};

export default empleadosModel;
