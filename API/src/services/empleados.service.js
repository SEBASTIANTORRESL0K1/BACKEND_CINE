import { crearUsuario, obtenerUsuarioPorCorreo } from './usuarios.service.js';
import { pool } from '../database/database.js';
import e from 'cors';

export const getAllEmpleados = async () => {
    const [rows] = await pool.query('SELECT * FROM EMPLEADOS');
    return rows;
};

export const getEmpleadoById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM EMPLEADOS WHERE id_empleado = ?', [id]);
    return rows[0];
};

export const createEmpleado = async (empleado) => {
    const usuarioExistente = await obtenerUsuarioPorCorreo(empleado.correo);
    let id_usuario;
    if (usuarioExistente) {
        id_usuario = usuarioExistente.id_usuario;
    } else {
        const usuario = await crearUsuario(empleado);
        id_usuario = usuario.id_usuario;
    }

    const { fecha_contratacion, activo, rol } = empleado;
    const [result] = await pool.query('INSERT INTO EMPLEADOS (id_usuario, fecha_contratacion, activo, rol) VALUES (?, ?, ?, ?)', [id_usuario, fecha_contratacion, activo, rol]);
    return { id_empleado: result.insertId, ...empleado };
};

export const updateEmpleado = async (id, empleado) => {
    const { id_usuario, fecha_contratacion, activo, rol } = empleado;
    await pool.query('UPDATE EMPLEADOS SET id_usuario = ?, fecha_contratacion = ?, activo = ?, rol = ? WHERE id_empleado = ?', [id_usuario, fecha_contratacion, activo, rol, id]);
    return { id_empleado: id, ...empleado };
};

export const deleteEmpleado = async (id) => {
    const [result] = await pool.query('DELETE FROM EMPLEADOS WHERE id_empleado = ?', [id]);
    return result.affectedRows > 0;
};
