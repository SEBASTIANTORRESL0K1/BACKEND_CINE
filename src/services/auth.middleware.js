import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';
import { ROLES } from '../constants/roles.js';

export const verifyToken = (req, res, next) => {
	try {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

		if (!token) {
			return res.status(403).json({ message: 'No se proveyó un token' });
		}

		jwt.verify(token, JWT_SECRET, (err, decoded) => {
			if (err) {
				return res.status(401).json({ message: 'No autorizado: Token inválido' });
			}
			req.userId = decoded.id;
			req.userRol = decoded.rol;
			next();
		});
	} catch (error) {
		return res.status(500).json({ message: 'Error interno al verificar el token' });
	}
};

export const isAdmin = (req, res, next) => {
	// Este middleware asume que verifyToken ya se ejecutó
	if (req.userRol === ROLES.ADMIN) {
		next();
		return;
	}

	return res.status(403).json({ message: 'Acceso denegado: Se requiere rol de Administrador' });
};