
import { pool } from '../database/database.js';

export const getAllHistorial = async () => {
    const [rows] = await pool.query('SELECT * FROM historial');
    return rows;
};

export const getHistorialById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM historial WHERE id_historial = ?', [id]);
    return rows[0];
};

export const createHistorial = async (historial) => {
    const { id_usuario, ip, tipo_movimiento, descripcion, tabla_afectada, id_registro_afectado, exito, origen } = historial;
    const [result] = await pool.query('INSERT INTO historial (id_usuario, ip, tipo_movimiento, descripcion, tabla_afectada, id_registro_afectado, exito, origen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [id_usuario, ip, tipo_movimiento, descripcion, tabla_afectada, id_registro_afectado, exito, origen]);
    return { id_historial: result.insertId, ...historial };
};

export const updateHistorial = async (id, historial) => {
    const { id_usuario, ip, tipo_movimiento, descripcion, tabla_afectada, id_registro_afectado, exito, origen } = historial;
    await pool.query('UPDATE historial SET id_usuario = ?, ip = ?, tipo_movimiento = ?, descripcion = ?, tabla_afectada = ?, id_registro_afectado = ?, exito = ?, origen = ? WHERE id_historial = ?', [id_usuario, ip, tipo_movimiento, descripcion, tabla_afectada, id_registro_afectado, exito, origen, id]);
    return { id_historial: id, ...historial };
};

export const deleteHistorial = async (id) => {
    const [result] = await pool.query('DELETE FROM historial WHERE id_historial = ?', [id]);
    return result.affectedRows > 0;
};
