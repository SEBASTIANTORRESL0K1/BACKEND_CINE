// database/index.js
import mysql from 'mysql2/promise';
import credentials from './credentials.js';

const pool = mysql.createPool({
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: credentials.database,
  port: credentials.port,
});

// Opcional: prueba conexión al iniciar
pool.getConnection()
  .then(() => console.log('✅ Conectado a MySQL (Docker o local)'))
  .catch(err => {
    console.error('❌ Error de conexión:', err);
    process.exit(1);
  });

export default pool;
