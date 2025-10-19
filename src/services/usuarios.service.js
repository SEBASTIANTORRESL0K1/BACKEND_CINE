
import { pool } from '../database/database.js';
import bcrypt from 'bcryptjs';

export const getAllUsuarios = async () => {
    const [rows] = await pool.query('SELECT * FROM USUARIOS');
    return rows;
};

export const getUsuarioById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM USUARIOS WHERE id_usuario = ?', [id]);
    return rows[0];
};

export const createUsuario = async (usuario) => {
    const { nombre, primer_apellido, segundo_apellido, fecha_nacimiento, sexo, codigo_postal, numero_telefono, correo, contrasena } = usuario;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);
    const [result] = await pool.query('INSERT INTO USUARIOS (nombre, primer_apellido, segundo_apellido, fecha_nacimiento, sexo, codigo_postal, numero_telefono, correo, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, primer_apellido, segundo_apellido, fecha_nacimiento, sexo, codigo_postal, numero_telefono, correo, hashedPassword]);
    return { id_usuario: result.insertId, ...usuario };
};

export const updateUsuario = async (id, usuario) => {
    const { nombre, primer_apellido, segundo_apellido, fecha_nacimiento, sexo, codigo_postal, numero_telefono, correo, contrasena } = usuario;
    let hashedPassword = contrasena;
    if (contrasena) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(contrasena, salt);
    }
    await pool.query('UPDATE USUARIOS SET nombre = ?, primer_apellido = ?, segundo_apellido = ?, fecha_nacimiento = ?, sexo = ?, codigo_postal = ?, numero_telefono = ?, correo = ?, contrasena = ? WHERE id_usuario = ?', [nombre, primer_apellido, segundo_apellido, fecha_nacimiento, sexo, codigo_postal, numero_telefono, correo, hashedPassword, id]);
    return { id_usuario: id, ...usuario };
};

export const deleteUsuario = async (id) => {
    const [result] = await pool.query('DELETE FROM USUARIOS WHERE id_usuario = ?', [id]);
    return result.affectedRows > 0;
};

export const comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

export const loginUsuario = async (correo, contrasena) => {
    const [rows] = await pool.query('SELECT * FROM USUARIOS WHERE correo = ?', [correo]);
    if (rows.length === 0) {
        return null; // Usuario no encontrado
    }
    const usuario = rows[0];
    
    const isMatch = await comparePassword(contrasena, usuario.contrasena);
    
    if (!isMatch) {
        return null; // Contraseña incorrecta
    }
    
    return usuario;
};
