
import { pool } from '../database/database.js';

export const getAllClientes = async () => {
    const [rows] = await pool.query('SELECT * FROM CLIENTES');
    return rows;
};

export const getClienteById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM CLIENTES WHERE id_cliente = ?', [id]);
    return rows[0];
};

export const createCliente = async (cliente) => {
    const { id_usuario, puntos, id_membresia, activo } = cliente;
    const [result] = await pool.query('INSERT INTO CLIENTES (id_usuario, puntos, id_membresia, activo) VALUES (?, ?, ?, ?)', [id_usuario, puntos, id_membresia, activo]);
    return { id_cliente: result.insertId, ...cliente };
};

export const updateCliente = async (id, cliente) => {
    const { id_usuario, puntos, id_membresia, activo } = cliente;
    await pool.query('UPDATE CLIENTES SET id_usuario = ?, puntos = ?, id_membresia = ?, activo = ? WHERE id_cliente = ?', [id_usuario, puntos, id_membresia, activo, id]);
    return { id_cliente: id, ...cliente };
};

export const deleteCliente = async (id) => {
    const [result] = await pool.query('DELETE FROM CLIENTES WHERE id_cliente = ?', [id]);
    return result.affectedRows > 0;
};
