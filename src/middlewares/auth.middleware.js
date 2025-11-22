import usuarioModel from "../models/usuarios.models.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/**
 * Middleware para manejar la autenticación y registro de usuarios.
 */
const authMiddleware = {
    /**
     * Middleware para registrar un nuevo usuario.
     * Valida los datos y verifica duplicados antes de pasar al controlador o responder.
     * En este diseño, el middleware realiza la lógica de negocio de autenticación completa
     * y responde directamente, actuando como un controlador especializado.
     */
    signUp: async (req, res, next) => {
        // Validación del cuerpo de la solicitud
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ success: false, message: 'El cuerpo de la solicitud no puede estar vacío' });
        }

        const { nombre, primer_apellido, segundo_apellido, fecha_nacimiento, sexo, codigo_postal, numero_telefono, correo, contrasena } = req.body;

        // Validaciones básicas
        if (!nombre || !primer_apellido || !segundo_apellido || !fecha_nacimiento || !sexo || !codigo_postal || !numero_telefono || !correo || !contrasena) {
            return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
        }
        if (!/\S+@\S+\.\S+/.test(correo)) {
            return res.status(400).json({ success: false, message: 'Email inválido' });
        }

        try {
            const usuarioExistenteCorreo = await usuarioModel.getByEmail(correo);
            if (usuarioExistenteCorreo) return res.status(400).json({ success: false, message: 'El correo ya está registrado' });

            const usuarioExistenteTelefono = await usuarioModel.getByPhoneNumber(numero_telefono);
            if (usuarioExistenteTelefono) return res.status(400).json({ success: false, message: 'El teléfono ya está registrado' });

            // Si todo es válido, pasamos al siguiente paso (que podría ser el controlador para crear)
            // O, si seguimos la instrucción de "middleware haga la parte que le corresponda",
            // podemos inyectar los datos validados en req y dejar que el controlador cree.
            // Sin embargo, la instrucción dice "login y signup se implementen en middleware".
            // A menudo esto significa que la lógica de auth vive aquí.
            // Para mantener la estructura MVC pero usar middleware, validamos aquí y dejamos que el controller cree.
            // Pero el usuario pidió que la lógica de validación esté en middleware.

            next();
        } catch (error) {
            console.error('❌ Error en signUpMiddleware:', error.message);
            res.status(500).json({ success: false, message: 'Error en la validación del registro', error: error.message });
        }
    },

    /**
     * Middleware para iniciar sesión.
     * Valida credenciales y genera el token.
     */
    login: async (req, res) => {
        const { correo, contrasena } = req.body;

        if (!correo || !contrasena) {
            return res.status(400).json({ success: false, message: 'Correo y contraseña son obligatorios' });
        }

        try {
            const usuario = await usuarioModel.getByEmail(correo);
            if (!usuario) {
                return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
            }

            const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
            }

            const roles = await usuarioModel.getRoles(usuario.id_usuario);

            const token = jwt.sign(
                { id: usuario.id_usuario, roles },
                process.env.JWT_SECRET || 'secret_key',
                { expiresIn: '2h' }
            );

            const { contrasena: pass, ...usuarioResponse } = usuario;

            // Respondemos directamente aquí ya que es una operación de auth completa
            res.status(200).json({
                success: true,
                message: 'Inicio de sesión exitoso',
                token,
                user: usuarioResponse,
                roles
            });

        } catch (error) {
            console.error('❌ Error en loginMiddleware:', error.message);
            res.status(500).json({ success: false, message: 'Error en el inicio de sesión' });
        }
    }
};

export default authMiddleware;
