import express from 'express';
import cors from 'cors';
import credentials from './config/credentials.js';
import routes from './routes/index.routes.js'; // Importa las rutas principales

const app = express();
const PORT = credentials.portApi || 3005; // Usa el puerto del archivo .env o un valor predeterminado

// Middleware para manejar JSON y habilitar CORS
app.use(express.json());
app.use(cors());

// Usa las rutas definidas en routes/index.js
app.use('/', routes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  console.log(`probando`)