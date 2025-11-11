import pool from "../config/pool.js";

const peliculaModel = {
  /**
   * Obtiene todas las películas.
   * @returns {Promise<Array>} - Lista de películas.
   */
  getAll: async () => {
    try {
      const [rows] = await pool.query('SELECT * FROM peliculas');
      return rows;
    } catch (error) {
      console.error('❌ Error en getAll:', error.message);
      throw new Error('Error al obtener todas las películas');
    }
  },

  /**
   * Obtiene una película por su ID.
   * @param {number} id - ID de la película.
   * @returns {Promise<Object|null>} - La película encontrada o null si no existe.
   */
  getById: async (id) => {
    try {
      const [rows] = await pool.query('SELECT * FROM peliculas WHERE id_pelicula = ?', [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('❌ Error en getById:', error.message);
      throw new Error('Error al buscar la película por ID');
    }
  },

  /**
   * Crea una nueva película.
   * @param {Object} peliculaData - Datos de la película a crear.
   * @returns {Promise<Object>} - La película creada.
   */
  create: async (peliculaData) => {
    try {
      const {
        nombre,
        url_portada,
        duracion,
        director,
        url_trailer,
        genero,
        estado_cartelera,
        fecha_inicio_estreno,
        fecha_fin_estreno,
        activo,
      } = peliculaData;

      // Validar campos obligatorios
      if (
        !nombre ||
        !url_portada ||
        !duracion ||
        !director ||
        !url_trailer ||
        !genero ||
        !estado_cartelera ||
        !fecha_inicio_estreno ||
        typeof activo !== 'boolean'
      ) {
        throw new Error('Todos los campos son obligatorios y deben ser válidos');
      }

      // Validar que las fechas sean válidas
      const fechaInicioValida = new Date(fecha_inicio_estreno);
      const fechaFinValida = new Date(fecha_fin_estreno);

      if (isNaN(fechaInicioValida.getTime()) || isNaN(fechaFinValida.getTime())) {
        throw new Error('Las fechas proporcionadas no son válidas');
      }

      // Crear la película
      const [result] = await pool.query(
        'INSERT INTO peliculas (nombre, url_portada, duracion, director, url_trailer, genero, estado_cartelera, fecha_inicio_estreno, fecha_fin_estreno, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          nombre,
          url_portada,
          duracion,
          director,
          url_trailer,
          genero,
          estado_cartelera,
          fecha_inicio_estreno,
          fecha_fin_estreno,
          activo,
        ]
      );

      return { id_pelicula: result.insertId, ...peliculaData };
    } catch (error) {
      console.error('❌ Error en create:', error.message);
      throw new Error('Error al crear la película');
    }
  },

  /**
   * Actualiza una película existente.
   * @param {number} id - ID de la película a actualizar.
   * @param {Object} peliculaData - Datos de la película a actualizar.
   * @returns {Promise<boolean>} - True si se actualizó correctamente, false si no se encontró la película.
   */
  patch: async (id, peliculaData) => {
    try {
      const updates = [];
      const params = [];

      for (const key of [
        'nombre',
        'url_portada',
        'duracion',
        'director',
        'url_trailer',
        'genero',
        'estado_cartelera',
        'fecha_inicio_estreno',
        'fecha_fin_estreno',
        'activo',
      ]) {
        if (peliculaData[key] !== undefined) {
          updates.push(`${key} = ?`);
          params.push(peliculaData[key]);
        }
      }

      if (updates.length === 0) {
        return false; // No hay campos para actualizar
      }

      params.push(id); // Añadir el ID al final de los parámetros
      const query = `UPDATE peliculas SET ${updates.join(', ')} WHERE id_pelicula = ?`;

      const [result] = await pool.query(query, params);
      return result.affectedRows > 0; // Retorna true si se actualizó al menos una fila
    } catch (error) {
      console.error('❌ Error en patch:', error.message);
      throw new Error('Error al actualizar la película');
    }
  },

  /**
   * Elimina una película por su ID.
   * @param {number} id - ID de la película a eliminar.
   * @returns {Promise<boolean>} - True si se eliminó correctamente, false si no se encontró la película.
   */
  delete: async (id) => {
    try {
      const [result] = await pool.query('DELETE FROM peliculas WHERE id_pelicula = ?', [id]);
      return result.affectedRows > 0; // Retorna true si se eliminó al menos una fila
    } catch (error) {
      console.error('❌ Error en delete:', error.message);
      throw new Error('Error al eliminar la película');
    }
  },
};

export default peliculaModel;