
import { pool } from '../database/database.js';

export const getAllPeliculas = async () => {
    const [rows] = await pool.query('SELECT * FROM PELICULAS');
    return rows;
};

export const getPeliculaById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM PELICULAS WHERE id_pelicula = ?', [id]);
    return rows[0];
};

export const createPelicula = async (pelicula) => {
    const { nombre, url_portada, duracion, director, url_trailer, genero, estado_cartelera, fecha_inicio_estreno, fecha_fin_estreno, activo } = pelicula;
    const [result] = await pool.query('INSERT INTO PELICULAS (nombre, url_portada, duracion, director, url_trailer, genero, estado_cartelera, fecha_inicio_estreno, fecha_fin_estreno, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, url_portada, duracion, director, url_trailer, genero, estado_cartelera, fecha_inicio_estreno, fecha_fin_estreno, activo]);
    return { id_pelicula: result.insertId, ...pelicula };
};

export const updatePelicula = async (id, pelicula) => {
    const { nombre, url_portada, duracion, director, url_trailer, genero, estado_cartelera, fecha_inicio_estreno, fecha_fin_estreno, activo } = pelicula;
    await pool.query('UPDATE PELICULAS SET nombre = ?, url_portada = ?, duracion = ?, director = ?, url_trailer = ?, genero = ?, estado_cartelera = ?, fecha_inicio_estreno = ?, fecha_fin_estreno = ?, activo = ? WHERE id_pelicula = ?', [nombre, url_portada, duracion, director, url_trailer, genero, estado_cartelera, fecha_inicio_estreno, fecha_fin_estreno, activo, id]);
    return { id_pelicula: id, ...pelicula };
};

export const deletePelicula = async (id) => {
    const [result] = await pool.query('DELETE FROM PELICULAS WHERE id_pelicula = ?', [id]);
    return result.affectedRows > 0;
};
