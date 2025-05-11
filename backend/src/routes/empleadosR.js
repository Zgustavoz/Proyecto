import { getConnection } from "../dataBase/connection.js";
import express from "express";

const router = express.Router();

// Obtener todos los empleados
router.get("/", async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT MIN(e.ci) AS ci, u.nombreUsuario, u.nombre, u.correo, u.telefono, u.tipoUsuario
      FROM usuario u
      JOIN empleado e ON e.idUsuario = u.id
      WHERE u.idRol <> 4
      GROUP BY u.nombreUsuario, u.nombre, u.correo, u.telefono, u.tipoUsuario
      ORDER BY u.nombre ASC;
    `);
    res.json(result.recordset);
  } catch (error) {
    console.error("Error en endpoint /api/empleados:", error);
    res.status(500).json({
      error: "Error al obtener empleados",
      details: error.message
    });
  }
});

export default router;
