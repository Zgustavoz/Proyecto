import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import usuariosRoutes from './src/routes/usuariosR.js';


config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

//rutas
app.use('/api/usuarios',usuariosRoutes);

//iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});