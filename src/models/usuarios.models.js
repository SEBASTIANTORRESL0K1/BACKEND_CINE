import pool from "../config/pool.js";
import bcrypt from "bcrypt";

const usuarioModel = {
  /**
   * Obtiene todos los usuarios.
   * @returns {Promise<Array>} - Lista de usuarios.
   */
  getAll: async () => {
    try {
      const [rows] = await pool.query(
        'SELECT id_usuario, nombre, primer_apellido, segundo_apellido, fecha_nacimiento, sexo, codigo_postal, numero_telefono, correo FROM usuarios'
      );
      return rows;
    } catch (error) {
      console.error('❌ Error en getAll:', error.message);
      throw new Error('Error al obtener todos los usuarios');
    }
  },

  /**
   * Obtiene un usuario por su ID.
   * @param {number} id - ID del usuario.
   * @returns {Promise<Object|null>} - El usuario encontrado o null si no existe.
   */
  getById: async (id) => {
    try {
      const [rows] = await pool.query(
        'SELECT id_usuario, nombre, primer_apellido, segundo_apellido, fecha_nacimiento, sexo, codigo_postal, numero_telefono, correo FROM usuarios WHERE id_usuario = ?',
        [id]
      );
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('❌ Error en getById:', error.message);
      throw new Error('Error al obtener el usuario por ID');
    }
  },

  /**
   * Busca usuarios por nombre, primer apellido y/o segundo apellido.
   * @param {string|null} nombre - Nombre del usuario (opcional).
   * @param {string|null} primer_apellido - Primer apellido del usuario (opcional).
   * @param {string|null} segundo_apellido - Segundo apellido del usuario (opcional).
   * @returns {Promise<Array>} - Lista de usuarios que coinciden con los criterios.
   */
  getByName: async (nombre = null, primer_apellido = null, segundo_apellido = null) => {
    try {
      let query = 'SELECT id_usuario, nombre, primer_apellido, segundo_apellido, fecha_nacimiento, sexo, codigo_postal, numero_telefono, correo FROM usuarios WHERE 1=1';
      const params = [];

      if (nombre) {
        query += ' AND nombre LIKE ?';
        params.push(`%${nombre}%`);
      }

      if (primer_apellido) {
        query += ' AND primer_apellido LIKE ?';
        params.push(`%${primer_apellido}%`);
      }

      if (segundo_apellido) {
        query += ' AND segundo_apellido LIKE ?';
        params.push(`%${segundo_apellido}%`);
      }

      const [rows] = await pool.query(query, params);
      return rows;
    } catch (error) {
      console.error('❌ Error en getByName:', error.message);
      throw new Error('Error al buscar usuarios por nombre/apellidos');
    }
  },
  getByEmail: async (correo) =>{
    try{
        const [rows] = await pool.query('SELECT id_usuario, nombre, primer_apellido, segundo_apellido, fecha_nacimiento, sexo, codigo_postal, numero_telefono, correo FROM usuarios WHERE correo = ?',[correo]);
        return rows.length > 0 ? rows[0] : null;
    }
    catch(error){
        console.error('Error en getByEmail:', error.message);
        throw new Error('Error al obtener el usuario por correo',error);
    }
  },
  getByPhoneNumber: async (numero_telefono)=>{
    try{
        const [rows]= await pool.query('SELECT id_usuario, nombre, primer_apellido, segundo_apellido, fecha_nacimiento, sexo, codigo_postal, numero_telefono, correo FROM usuarios WHERE numero_telefono = ?',[numero_telefono]);
        return rows.length > 0 ? rows[0] : null;
    }
    catch(error){
        console.error('Error en getByPhoneNumber:', error.message);
        throw new Error('Error al obtener el usuario por numero de telefono', error.message);
    }
  },

  /**
   * Crea un nuevo usuario.
   * @param {Object} usuarioData - Datos del usuario a crear.
   * @returns {Promise<Object>} - El usuario creado.
   */
  create: async (usuarioData) => {
    try {
      const { nombre, primer_apellido, segundo_apellido, fecha_nacimiento, sexo, codigo_postal, numero_telefono, correo, contrasena } =
        usuarioData;

      // Validar que todos los campos obligatorios estén presentes
      if (
        !nombre ||
        !primer_apellido ||
        !segundo_apellido ||
        !fecha_nacimiento ||
        !sexo ||
        !codigo_postal ||
        !numero_telefono ||
        !correo ||
        !contrasena
      ) {
        throw new Error('Todos los campos son obligatorios');
      }

      // Hashear la contraseña antes de guardarla en la base de datos
      const hashedPassword = await bcrypt.hash(contrasena, 10);

      const [result] = await pool.query(
        'INSERT INTO usuarios (nombre, primer_apellido, segundo_apellido, fecha_nacimiento, sexo, codigo_postal, numero_telefono, correo, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre, primer_apellido, segundo_apellido, fecha_nacimiento, sexo, codigo_postal, numero_telefono, correo, hashedPassword]
      );

      return { id_usuario: result.insertId, ...usuarioData, contrasena: hashedPassword };
    } catch (error) {
      console.error('❌ Error en create:', error.message);
      throw new Error('Error al crear el usuario');
    }
  },

  /**
   * Actualiza un usuario existente.
   * @param {number} id - ID del usuario a actualizar.
   * @param {Object} usuarioData - Datos del usuario a actualizar.
   * @returns {Promise<boolean>} - True si se actualizó correctamente, false si no se encontró el usuario.
   */
  patch: async (id, usuarioData) => {
    try {
      const updates = [];
      const params = [];

      for (const key of ['nombre', 'primer_apellido', 'segundo_apellido', 'fecha_nacimiento', 'sexo', 'codigo_postal', 'numero_telefono', 'correo']) {
        if (usuarioData[key] !== undefined) {
          updates.push(`${key} = ?`);
          params.push(usuarioData[key]);
        }
      }

      if (usuarioData.contrasena !== undefined) {
        const hashedPassword = await bcrypt.hash(usuarioData.contrasena, 10);
        updates.push('contrasena = ?');
        params.push(hashedPassword);
      }

      if (updates.length === 0) {
        return false; // No hay campos para actualizar
      }

      params.push(id); // Añadir el ID al final de los parámetros
      const query = `UPDATE usuarios SET ${updates.join(', ')} WHERE id_usuario = ?`;

      const [result] = await pool.query(query, params);
      return result.affectedRows > 0; // Retorna true si se actualizó al menos una fila
    } catch (error) {
      console.error('❌ Error en patch:', error);
      throw new Error('Error al actualizar el usuario');
    }
  },

  /**
   * Elimina un usuario por su ID.
   * @param {number} id - ID del usuario a eliminar.
   * @returns {Promise<boolean>} - True si se eliminó correctamente, false si no se encontró el usuario.
   */
  delete: async (id) => {
    try {
      const [result] = await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
      return result.affectedRows > 0; // Retorna true si se eliminó al menos una fila
    } catch (error) {
      console.error('❌ Error en delete:', error.message);
      throw new Error('Error al eliminar el usuario');
    }
  },
};

export default usuarioModel;