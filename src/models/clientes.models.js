import pool from "../config/pool.js";

const clienteModel = {
  /**
   * Obtiene todos los clientes.
   * @returns {Promise<Array>} - Lista de clientes.
   */
  getAll: async () => {
    try {
      const [rows] = await pool.query('SELECT * FROM clientes');
      return rows;
    } catch (error) {
      console.error('❌ Error en getAll:', error.message);
      throw new Error('Error al obtener todos los clientes');
    }
  },

  /**
   * Obtiene un cliente por su ID.
   * @param {number} id - ID del cliente.
   * @returns {Promise<Object|null>} - El cliente encontrado o null si no existe.
   */
  getById: async (id) => {
    try {
      const [rows] = await pool.query('SELECT c.id_cliente, c.id_usuario, c.puntos, c.id_membresia, c.activo, u.nombre, u.primer_apellido, u.segundo_apellido, u.fecha_nacimiento, u.sexo, u.codigo_postal, u.numero_telefono, u.correo FROM clientes c JOIN usuarios u ON c.id_usuario = u.id_usuario WHERE c.id_cliente = ?', [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('❌ Error en getById:', error.message);
      throw new Error('Error al buscar el cliente por ID');
    }
  },

  /**
   * Obtiene un cliente por su ID de usuario.
   * @param {number} idUsuario - ID del usuario asociado al cliente.
   * @returns {Promise<Object|null>} - El cliente encontrado o null si no existe.
   */
  getByUsuarioId: async (idUsuario) => {
    try {
      const [rows] = await pool.query('SELECT * FROM clientes WHERE id_usuario = ?', [idUsuario]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('❌ Error en getByUsuarioId:', error.message);
      throw new Error('Error al buscar el cliente por ID de usuario');
    }
  },

  /**
   * Crea un nuevo cliente.
   * @param {Object} clienteData - Datos del cliente a crear.
   * @returns {Promise<Object>} - El cliente creado.
   */
  create: async (clienteData) => {
    try {
      const { id_usuario, puntos, id_membresia, activo } = clienteData;

      // Validar campos obligatorios
      if (!id_usuario || !id_membresia) {
        throw new Error('Todos los campos son obligatorios y deben ser válidos');
      }

      // Ensure puntos is a number (can be 0)
      if (typeof puntos !== 'number') {
        throw new Error('Puntos debe ser un número');
      }

      // Ensure activo is boolean or number (can be false or 0)
      if (activo === undefined || activo === null) {
        throw new Error('Activo es obligatorio');
      }

      // Verificar si ya existe un cliente con el mismo id_usuario
      const [existingCliente] = await pool.query('SELECT * FROM clientes WHERE id_usuario = ?', [id_usuario]);

      if (existingCliente.length > 0) {
        throw new Error('Ya existe un cliente asociado a este usuario');
      }

      // Crear el cliente
      const [result] = await pool.query(
        'INSERT INTO clientes (id_usuario, puntos, id_membresia, activo) VALUES (?, ?, ?, ?)',
        [id_usuario, puntos, id_membresia, activo]
      );

      return { id_cliente: result.insertId, id_usuario, puntos, id_membresia, activo };
    } catch (error) {
      console.error('❌ Error en create:', error.message);
      throw new Error('Error al crear el cliente');
    }
  },

  /**
   * Actualiza un cliente existente.
   * @param {number} id - ID del cliente a actualizar.
   * @param {Object} clienteData - Datos del cliente a actualizar.
   * @returns {Promise<boolean>} - True si se actualizó correctamente, false si no se encontró el cliente.
   */
  patch: async (id, clienteData) => {
    try {
      const { id_usuario, puntos, id_membresia, activo } = clienteData;

      // Construir dinámicamente la consulta de actualización
      const updates = [];
      const params = [];

      if (id_usuario !== undefined) {
        updates.push('id_usuario = ?');
        params.push(id_usuario);
      }

      if (puntos !== undefined) {
        if (typeof puntos !== 'number' || puntos < 0) {
          throw new Error('Los puntos deben ser un número válido mayor o igual a cero');
        }
        updates.push('puntos = ?');
        params.push(puntos);
      }

      if (id_membresia !== undefined) {
        updates.push('id_membresia = ?');
        params.push(id_membresia);
      }

      if (activo !== undefined) {
        if (typeof activo !== 'boolean') {
          throw new Error('El campo activo debe ser un valor booleano');
        }
        updates.push('activo = ?');
        params.push(activo ? 1 : 0); // Convertir booleano a TINYINT(1)
      }

      if (updates.length === 0) {
        return false; // No hay campos para actualizar
      }

      params.push(id); // Añadir el ID al final de los parámetros
      const query = `UPDATE clientes SET ${updates.join(', ')} WHERE id_cliente = ?`;

      const [result] = await pool.query(query, params);
      return result.affectedRows > 0; // Retorna true si se actualizó al menos una fila
    } catch (error) {
      console.error('❌ Error en patch:', error.message);
      throw new Error('Error al actualizar el cliente');
    }
  },

  /**
   * Elimina un cliente por su ID.
   * @param {number} id - ID del cliente a eliminar.
   * @returns {Promise<boolean>} - True si se eliminó correctamente, false si no se encontró el cliente.
   */
  delete: async (id) => {
    try {
      const [result] = await pool.query('DELETE FROM clientes WHERE id_cliente = ?', [id]);
      return result.affectedRows > 0; // Retorna true si se eliminó al menos una fila
    } catch (error) {
      console.error('❌ Error en delete:', error.message);
      throw new Error('Error al eliminar el cliente');
    }
  },
};

export default clienteModel;