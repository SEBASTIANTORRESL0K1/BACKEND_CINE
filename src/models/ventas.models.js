import pool from "../config/pool.js";

const ventasModel = {
    // Obtener todas las ventas
    getAll: async () => {
        try {
            const [ rows ] = await pool.query("SELECT * FROM ventas ORDER BY fecha_hora DESC");
            if(rows.length === 0){
                return "No hay ventas";
            }
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener las ventas: ${error.message}`);
        }
    },

    // Obtener una venta por ID
    getById: async (id_venta) => {
        try {
            const { rows } = await pool.query("SELECT * FROM ventas WHERE id_venta = $1", [id_venta]);

            if (rows.length === 0) {
                return null; // No se encontró la venta
            }

            return rows[0];
        } catch (error) {
            throw new Error(`Error al obtener la venta por ID: ${error.message}`);
        }
    },

    // Crear una nueva venta
    create: async (id_cliente, total) => {
        try {
            const  venta = await pool.query(
                "INSERT INTO ventas ( id_cliente,fecha_hora, total) VALUES ( ?, NOW(), ?) ",
                [id_cliente, total]
            );
            return [{"id_venta":venta[0].insertId},{"id_cliente":id_cliente},{"total":total}]; // Devuelve la venta creada
        } catch (error) {
            throw new Error(`Error al crear la venta: ${error.message}`);
        }
    },

    // Actualizar una venta existente
    update: async (id_venta, updates) => {
        try {
            const setClause = Object.keys(updates)
                .map((key, index) => `${key} = $${index + 2}`)
                .join(", ");
            const values = [id_venta, ...Object.values(updates)];

            const query = `UPDATE ventas SET ${setClause} WHERE id_venta = $1 RETURNING *`;
            const { rows } = await pool.query(query, values);

            if (rows.length === 0) {
                return null; // No se encontró la venta
            }

            return rows[0]; // Devuelve la venta actualizada
        } catch (error) {
            throw new Error(`Error al actualizar la venta: ${error.message}`);
        }
    },

    // Eliminar una venta
    delete: async (id_venta) => {
        try {
            const { rows } = await pool.query("DELETE FROM ventas WHERE id_venta = $1 RETURNING *", [id_venta]);

            if (rows.length === 0) {
                return null; // No se encontró la venta
            }

            return rows[0]; // Devuelve la venta eliminada
        } catch (error) {
            throw new Error(`Error al eliminar la venta: ${error.message}`);
        }
    },
};

export default ventasModel;