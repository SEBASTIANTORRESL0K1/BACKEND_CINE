
import { pool } from '../database/database.js';

export const getAllVentas = async () => {
    const [rows] = await pool.query('SELECT * FROM VENTAS');
    return rows;
};

export const getVentaById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM VENTAS WHERE id_venta = ?', [id]);
    return rows[0];
};

export const createVenta = async (venta) => {
    const { id_cliente, fecha_hora, total } = venta;
    const [result] = await pool.query('INSERT INTO VENTAS (id_cliente, fecha_hora, total) VALUES (?, ?, ?)', [id_cliente, fecha_hora, total]);
    return { id_venta: result.insertId, ...venta };
};

export const updateVenta = async (id, venta) => {
    const { id_cliente, fecha_hora, total } = venta;
    await pool.query('UPDATE VENTAS SET id_cliente = ?, fecha_hora = ?, total = ? WHERE id_venta = ?', [id_cliente, fecha_hora, total, id]);
    return { id_venta: id, ...venta };
};

export const deleteVenta = async (id) => {
    const [result] = await pool.query('DELETE FROM VENTAS WHERE id_venta = ?', [id]);
    return result.affectedRows > 0;
};
