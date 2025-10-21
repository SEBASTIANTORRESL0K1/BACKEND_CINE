
import { pool } from '../database/database.js';

export const getAllSalas = async () => {
    const [rows] = await pool.query('SELECT * FROM SALAS');
    return rows;
};

export const getSalaById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM SALAS WHERE id_sala = ?', [id]);
    return rows[0];
};

export const createSala = async (sala) => {
    const { id_cine, numero_sala } = sala;
    const [result] = await pool.query('INSERT INTO SALAS (id_cine, numero_sala) VALUES (?, ?)', [id_cine, numero_sala]);
    return { id_sala: result.insertId, ...sala };
};

export const updateSala = async (id, sala) => {
    const { id_cine, numero_sala } = sala;
    await pool.query('UPDATE SALAS SET id_cine = ?, numero_sala = ? WHERE id_sala = ?', [id_cine, numero_sala, id]);
    return { id_sala: id, ...sala };
};

export const deleteSala = async (id) => {
    const [result] = await pool.query('DELETE FROM SALAS WHERE id_sala = ?', [id]);
    return result.affectedRows > 0;
};
