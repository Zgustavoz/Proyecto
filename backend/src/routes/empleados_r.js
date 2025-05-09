// Endpoint para empleados
app.get('/api/empleados', async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request()
      .query(`
        SELECT 
          u.id,
          u.nombre,
          u.correo,
          u.telefono,
          u.tipoUsuario,
          e.ci,
          r.nombre as rolNombre,
          e.descripcion as estadoDescripcion
        FROM Empleado e
        INNER JOIN Usuario u ON e.idUsuario = u.id
        INNER JOIN Rol r ON u.idRol = r.id
        INNER JOIN Estado es ON u.idEstado = es.id
        WHERE u.tipoUsuario = 'empleado' OR u.tipoUsuario = 'administrador'
        ORDER BY u.nombre
      `);
      res.json(result.recordset);
    } catch (error) {
      console.error('Error en endpoint /api/empleado:', error);
      res.status(500).json({ 
        error: 'Error al obtener empleados',
        details: error.message 
      });
    }
  });