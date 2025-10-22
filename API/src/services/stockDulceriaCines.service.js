
import { pool } from '../database/database.js';

export const getAllStockDulceriaCines = async () => {
    const [rows] = await pool.query('SELECT * FROM STOCK_DULCERIA_CINES');
    return rows;
};

export const getStockDulceriaCineById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM STOCK_DULCERIA_CINES WHERE id_stock_dulceria = ?', [id]);
    return rows[0];
};

export const createStockDulceriaCine = async (stock) => {
    const { id_cine, id_dulce } = stock;
    const [result] = await pool.query('INSERT INTO STOCK_DULCERIA_CINES (id_cine, id_dulce) VALUES (?, ?)', [id_cine, id_dulce]);
    return { id_stock_dulceria: result.insertId, ...stock };
};

export const updateStockDulceriaCine = async (id, stock) => {
    const { id_cine, id_dulce } = stock;
    await pool.query('UPDATE STOCK_DULCERIA_CINES SET id_cine = ?, id_dulce = ? WHERE id_stock_dulceria = ?', [id_cine, id_dulce, id]);
    return { id_stock_dulceria: id, ...stock };
};

export const deleteStockDulceriaCine = async (id) => {
    const [result] = await pool.query('DELETE FROM STOCK_DULCERIA_CINES WHERE id_stock_dulceria = ?', [id]);
    return result.affectedRows > 0;
};
