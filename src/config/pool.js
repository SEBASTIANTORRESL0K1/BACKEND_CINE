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
let tryConections = 0;
// Opcional: prueba conexión al iniciar
const makeConnection = () => {
  pool.getConnection()
    .then(() => console.log('✅ Conectado a MySQL (Docker o local)'))
    .catch(err => {
      console.error('❌ Error de conexión:', err);
      tryConections++;
      if (tryConections < 5) {
        console.log(`Intento ${tryConections} de 5`)
        makeConnection();
        return;
      }

      process.exit(1);
    });
}
makeConnection();
export default pool;
