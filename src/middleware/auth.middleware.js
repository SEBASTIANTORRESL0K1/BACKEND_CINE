
import jwt from 'jsonwebtoken';
import { JWT_SECRET} from '../config.js';

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ message: 'No se proveyó un token' });
  }

  // El formato es "Bearer <token>"
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token malformado o no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Adjuntamos los datos decodificados del usuario al objeto request
    req.usuario = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }
    return res.status(401).json({ message: 'Token no válido' });
  }
};

export const isAdmin = (req, res, next) => {
  // Asumiendo que verificarToken ya adjuntó el usuario a req.usuario
  if (req.usuario && req.usuario.rol === 'admin') { // Ajusta 'admin' al valor real de tu rol de administrador
    next();
  } else {
    return res.status(403).json({ message: 'Acceso denegado: Se requiere rol de Administrador' });
  }
};
        