
import { pool } from '../database/database.js';

export const getAllReservas = async () => {
    const [rows] = await pool.query('SELECT * FROM RESERVA');
    return rows;
};

export const getReservaById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM RESERVA WHERE id_reserva = ?', [id]);
    return rows[0];
};

export const createReserva = async (reserva) => {
    const { id_asiento, id_cliente, fecha } = reserva;
    const [result] = await pool.query('INSERT INTO RESERVA (id_asiento, id_cliente, fecha) VALUES (?, ?, ?)', [id_asiento, id_cliente, fecha]);
    return { id_reserva: result.insertId, ...reserva };
};

export const updateReserva = async (id, reserva) => {
    const { id_asiento, id_cliente, fecha } = reserva;
    await pool.query('UPDATE RESERVA SET id_asiento = ?, id_cliente = ?, fecha = ? WHERE id_reserva = ?', [id_asiento, id_cliente, fecha, id]);
    return { id_reserva: id, ...reserva };
};

export const deleteReserva = async (id) => {
    const [result] = await pool.query('DELETE FROM RESERVA WHERE id_reserva = ?', [id]);
    return result.affectedRows > 0;
};
