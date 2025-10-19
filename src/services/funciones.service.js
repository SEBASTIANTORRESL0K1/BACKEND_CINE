
import { pool } from '../database/database.js';

export const getAllFunciones = async () => {
    const [rows] = await pool.query('SELECT * FROM FUNCIONES');
    return rows;
};

export const getFuncionById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM FUNCIONES WHERE id_funcion = ?', [id]);
    return rows[0];
};

export const createFuncion = async (funcion) => {
    const { id_sala, id_pelicula, fecha_hora, precio } = funcion;
    const [result] = await pool.query('INSERT INTO FUNCIONES (id_sala, id_pelicula, fecha_hora, precio) VALUES (?, ?, ?, ?)', [id_sala, id_pelicula, fecha_hora, precio]);
    return { id_funcion: result.insertId, ...funcion };
};

export const updateFuncion = async (id, funcion) => {
    const { id_sala, id_pelicula, fecha_hora, precio } = funcion;
    await pool.query('UPDATE FUNCIONES SET id_sala = ?, id_pelicula = ?, fecha_hora = ?, precio = ? WHERE id_funcion = ?', [id_sala, id_pelicula, fecha_hora, precio, id]);
    return { id_funcion: id, ...funcion };
};

export const deleteFuncion = async (id) => {
    const [result] = await pool.query('DELETE FROM FUNCIONES WHERE id_funcion = ?', [id]);
    return result.affectedRows > 0;
};
