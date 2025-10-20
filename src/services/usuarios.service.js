import {ROLES} from '../constants/roles.js';
import { pool } from '../database/database.js';
import { Usuario } from '../models/USUARIO.js';
import bcrypt from 'bcryptjs';

export const obtenerTodosLosUsuarios = async () => {
    const [rows] = await pool.query('SELECT * FROM USUARIOS');
    const usuarios = rows.map(row => new Usuario(row));
    return usuarios;
};

export const obtenerUsuarioPorId = async (id) => {
    const [rows] = await pool.query('SELECT * FROM USUARIOS WHERE id_usuario = ?', [id]);
    const usuario = new Usuario(rows[0]);
    return usuario
};
export const obtenerUsuarioPorCorreo = async (correo) => {
    const [rows] = await pool.query('SELECT * FROM USUARIOS WHERE correo = ?', [correo]);
    const usuario = new Usuario(rows[0]);
    return usuario
};

export const crearUsuario = async (usuario) => {
    const { nombre, primer_apellido, segundo_apellido, fecha_nacimiento, sexo, codigo_postal, numero_telefono, correo, contrasena} = usuario;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);
    const [result] = await pool.query('INSERT INTO USUARIOS (nombre, primer_apellido, segundo_apellido, fecha_nacimiento, sexo, codigo_postal, numero_telefono, correo, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, primer_apellido, segundo_apellido, fecha_nacimiento, sexo, codigo_postal, numero_telefono, correo, hashedPassword]);
    usuario.id_usuario = result.insertId;
    return new Usuario(usuario) ;
};

export const actualizarUsuario = async (id, usuario) => {
    const { nombre, primer_apellido, segundo_apellido, fecha_nacimiento, sexo, codigo_postal, numero_telefono, correo, contrasena } = usuario;
    let hashedPassword = contrasena;
    if (contrasena) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(contrasena, salt);
    }
    await pool.query('UPDATE USUARIOS SET nombre = ?, primer_apellido = ?, segundo_apellido = ?, fecha_nacimiento = ?, sexo = ?, codigo_postal = ?, numero_telefono = ?, correo = ?, contrasena = ? WHERE id_usuario = ?', [nombre, primer_apellido, segundo_apellido, fecha_nacimiento, sexo, codigo_postal, numero_telefono, correo, hashedPassword, id]);
    usuario.id_usuario = id;
    return new Usuario(usuario);
};

export const eliminarUsuario = async (id) => {
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
    
    return new Usuario(usuario);
};
export const obtenerRolPorIdUsuario = async (id_usuario) => {
    const [rows] = await pool.query('SELECT rol FROM EMPLEADOS WHERE id_usuario = ?', [id_usuario]);
    if (rows.length > 0) {
        return rows[0].rol;
    }
    return ROLES.CLIENTE; // Rol por defecto si no es empleado
}
