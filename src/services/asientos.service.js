
import { pool } from '../database/database.js';

export const getAllAsientos = async () => {
    const [rows] = await pool.query('SELECT * FROM ASIENTOS');
    return rows;
};

export const getAsientoById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM ASIENTOS WHERE id_asiento = ?', [id]);
    return rows[0];
};

export const createAsiento = async (asiento) => {
    const { fila_columna, id_sala } = asiento;
    const [result] = await pool.query('INSERT INTO ASIENTOS (fila_columna, id_sala) VALUES (?, ?)', [fila_columna, id_sala]);
    return { id_asiento: result.insertId, ...asiento };
};

export const updateAsiento = async (id, asiento) => {
    const { fila_columna, id_sala } = asiento;
    await pool.query('UPDATE ASIENTOS SET fila_columna = ?, id_sala = ? WHERE id_asiento = ?', [fila_columna, id_sala, id]);
    return { id_asiento: id, ...asiento };
};

export const deleteAsiento = async (id) => {
    const [result] = await pool.query('DELETE FROM ASIENTOS WHERE id_asiento = ?', [id]);
    return result.affectedRows > 0;
};
