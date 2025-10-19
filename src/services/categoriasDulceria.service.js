
import { pool } from '../database/database.js';

export const getAllCategoriasDulceria = async () => {
    const [rows] = await pool.query('SELECT * FROM CATEGORIA_DULCERIA');
    return rows;
};

export const getCategoriaDulceriaById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM CATEGORIA_DULCERIA WHERE id_categoria_dulceria = ?', [id]);
    return rows[0];
};

export const createCategoriaDulceria = async (categoria) => {
    const { nombre } = categoria;
    const [result] = await pool.query('INSERT INTO CATEGORIA_DULCERIA (nombre) VALUES (?)', [nombre]);
    return { id_categoria_dulceria: result.insertId, ...categoria };
};

export const updateCategoriaDulceria = async (id, categoria) => {
    const { nombre } = categoria;
    await pool.query('UPDATE CATEGORIA_DULCERIA SET nombre = ? WHERE id_categoria_dulceria = ?', [nombre, id]);
    return { id_categoria_dulceria: id, ...categoria };
};

export const deleteCategoriaDulceria = async (id) => {
    const [result] = await pool.query('DELETE FROM CATEGORIA_DULCERIA WHERE id_categoria_dulceria = ?', [id]);
    return result.affectedRows > 0;
};
