// import { Router } from 'express';
import { getConnection } from '../dataBase/connection.js';
import express from 'express';
// import cors from 'cors';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
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
    res.status(500).json({
      error: 'Error al obtener usuarios',
      details: error.message,
      fullError: error 
    });
  }
});

export default router;
