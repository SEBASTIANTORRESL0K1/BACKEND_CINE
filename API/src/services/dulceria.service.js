
import { pool } from '../database/database.js';

export const getAllDulceria = async () => {
    const [rows] = await pool.query('SELECT * FROM DULCERIA');
    return rows;
};

export const getDulceById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM DULCERIA WHERE id_dulce = ?', [id]);
    return rows[0];
};

export const createDulce = async (dulce) => {
    const { nombre, tamano, tipo, id_categoria_dulceria, precio } = dulce;
    const [result] = await pool.query('INSERT INTO DULCERIA (nombre, tamano, tipo, id_categoria_dulceria, precio) VALUES (?, ?, ?, ?, ?)', [nombre, tamano, tipo, id_categoria_dulceria, precio]);
    return { id_dulce: result.insertId, ...dulce };
};

export const updateDulce = async (id, dulce) => {
    const { nombre, tamano, tipo, id_categoria_dulceria, precio } = dulce;
    await pool.query('UPDATE DULCERIA SET nombre = ?, tamano = ?, tipo = ?, id_categoria_dulceria = ?, precio = ? WHERE id_dulce = ?', [nombre, tamano, tipo, id_categoria_dulceria, precio, id]);
    return { id_dulce: id, ...dulce };
};

export const deleteDulce = async (id) => {
    const [result] = await pool.query('DELETE FROM DULCERIA WHERE id_dulce = ?', [id]);
    return result.affectedRows > 0;
};
