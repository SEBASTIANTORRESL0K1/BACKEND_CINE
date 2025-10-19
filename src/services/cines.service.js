import {Cine} from '../models/CINE.js';
import { pool } from '../database/database.js';

export const obtenerTodosLosCines = async () => {
    const [rows] = await pool.query('SELECT * FROM CINES');
    const cines = rows.map(row => new Cine(row));
    return cines;
};

export const obtenerCinePorId = async (id) => {
    const [rows] = await pool.query('SELECT * FROM CINES WHERE id_cine = ?', [id]);
    const cine= new Cine(rows[0]);
    return cine;
};
export const obtenerCinesPorNombre = async (nombre_cine)=>{
    const [rows] = await pool.query('SELECT * FROM CINES WHERE nombre_cine LIKE ?', [`%${nombre_cine}%`]);
    const cines = rows.map(row => new Cine(row));
    return cines;
}

export const crearCine = async (cineData) => {
    const newCine = new Cine(cineData);
    const [result] = await pool.query('INSERT INTO CINES (nombre_cine, codigo_postal) VALUES (?, ?)', [newCine.nombre_cine, newCine.codigo_postal]);
    newCine.asignarId(result.insertId);
    return newCine;
};

export const actualizarCine = async (id, cine) => {
    const cineData = new Cine(cine);
    await pool.query('UPDATE CINES SET nombre_cine = ?, codigo_postal = ? WHERE id_cine = ?', [cineData.nombre_cine, cineData.codigo_postal, id]);
    return { id_cine: id, ...cine };
};

export const eliminarCine = async (id) => {
    const [result] = await pool.query('DELETE FROM CINES WHERE id_cine = ?', [id]);
    console.log(result);
    if (result.affectedRows > 0){
        return true;
    }else{
        return false;
    };
};
