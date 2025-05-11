import { getConnection } from "../dataBase/connection.js";
import express from "express";

const router = express.Router();

// Obtener todos los clientesWeb
router.get("/", async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT 
        u.id AS id,
        u.nombreUsuario,
        u.nombre,
        u.correo,
        u.telefono,
        e.direccion,
        e.puntosFidelidad,
        u.tipoUsuario
      FROM usuario u
      JOIN ClienteWeb e ON e.idUsuario = u.id
      WHERE u.idRol = 4;
    `);
    res.json(result.recordset);
  } catch (error) {
    console.error("Error en endpoint /api/clientesWeb:", error);
    res.status(500).json({
      error: "Error al obtener clientesWeb",
      details: error.message
    });
  }
});

export default router;
