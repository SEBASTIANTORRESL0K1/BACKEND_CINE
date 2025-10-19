
import { pool } from '../database/database.js';

export const getAllDetalleVentas = async () => {
    const [rows] = await pool.query('SELECT * FROM DETALLE_VENTA');
    return rows;
};

export const getDetalleVentaById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM DETALLE_VENTA WHERE id_detalle_venta = ?', [id]);
    return rows[0];
};

export const createDetalleVenta = async (detalle) => {
    const { id_venta, cantidad, precio, id_funcion, id_asiento, id_dulce, tipo_item, subtotal } = detalle;
    const [result] = await pool.query('INSERT INTO DETALLE_VENTA (id_venta, cantidad, precio, id_funcion, id_asiento, id_dulce, tipo_item, subtotal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [id_venta, cantidad, precio, id_funcion, id_asiento, id_dulce, tipo_item, subtotal]);
    return { id_detalle_venta: result.insertId, ...detalle };
};

export const updateDetalleVenta = async (id, detalle) => {
    const { id_venta, cantidad, precio, id_funcion, id_asiento, id_dulce, tipo_item, subtotal } = detalle;
    await pool.query('UPDATE DETALLE_VENTA SET id_venta = ?, cantidad = ?, precio = ?, id_funcion = ?, id_asiento = ?, id_dulce = ?, tipo_item = ?, subtotal = ? WHERE id_detalle_venta = ?', [id_venta, cantidad, precio, id_funcion, id_asiento, id_dulce, tipo_item, subtotal, id]);
    return { id_detalle_venta: id, ...detalle };
};

export const deleteDetalleVenta = async (id) => {
    const [result] = await pool.query('DELETE FROM DETALLE_VENTA WHERE id_detalle_venta = ?', [id]);
    return result.affectedRows > 0;
};
