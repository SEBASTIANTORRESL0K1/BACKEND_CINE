
import { pool } from '../database/database.js';

export const getAllMembresias = async () => {
    const [rows] = await pool.query('SELECT * FROM MEMBRESIAS');
    return rows;
};

export const getMembresiaById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM MEMBRESIAS WHERE id_membresia = ?', [id]);
    return rows[0];
};

export const createMembresia = async (membresia) => {
    const { nombre } = membresia;
    const [result] = await pool.query('INSERT INTO MEMBRESIAS (nombre) VALUES (?)', [nombre]);
    return { id_membresia: result.insertId, ...membresia };
};

export const updateMembresia = async (id, membresia) => {
    const { nombre } = membresia;
    await pool.query('UPDATE MEMBRESIAS SET nombre = ? WHERE id_membresia = ?', [nombre, id]);
    return { id_membresia: id, ...membresia };
};

export const deleteMembresia = async (id) => {
    const [result] = await pool.query('DELETE FROM MEMBRESIAS WHERE id_membresia = ?', [id]);
    return result.affectedRows > 0;
};
