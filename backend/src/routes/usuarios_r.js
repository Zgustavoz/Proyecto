import { getConnection } from '../dataBase/connection.js';
import express from 'express';
import cors from 'cors';

const router = express.Router();

// Endpoint para usuarios
router.get('/usuarios', async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .query(`
        SELECT 
          id,
          nombreUsuario,
          nombre,
          correo,
          telefono,
          tipoUsuario
        FROM Usuario
      `);
    
    res.json(result.recordset);
  } catch (error) {
    console.error('Error en endpoint /api/usuarios:', error);
  }
});

export default router;