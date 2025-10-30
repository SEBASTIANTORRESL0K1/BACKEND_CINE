import { config } from 'dotenv';

// Solo carga dotenv si NO estás en Docker (ej: desarrollo local sin contenedores)
if (process.env.NODE_ENV !== 'production') {
  config({ silent: true }); // Carga las variables de entorno desde .env
}

const credentials = {
  host: process.env.DB_HOST || 'mysql', // Usa 'mysql' como valor predeterminado en Docker
  user: process.env.MYSQL_USER || 'cine_user', // Usuario de la base de datos
  password: process.env.MYSQL_PASSWORD || 'cine_pass', // Contraseña del usuario
  database: process.env.MYSQL_DATABASE || 'cine', // Nombre de la base de datos
  port: parseInt(process.env.DB_PORT, 10) || 3306, // Puerto predeterminado 3306
  portApi: parseInt(process.env.API_PORT, 10) || 3005,
};

export default credentials;