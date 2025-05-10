// import { Router } from 'express';
import { getConnection } from '../dataBase/connection.js'
import express from 'express'
// import cors from 'cors';

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request().query(`
      SELECT 
        id,
        nombreUsuario,
        nombre,
        correo,
        telefono,
        tipoUsuario
      FROM Usuario
    `)
        res.json(result.recordset)
    } catch (error) {
        console.error('Error en endpoint /api/usuarios:', error)
        res.status(500).json({
            error: 'Error al obtener usuarios',
            details: error.message,
            fullError: error
        })
    }
})
router.post('/', async (req, res) => {
    const rolMap = {
        administrador: 1,
        empleado: 2,
        cliente: 3
    }
    try {
        const pool = await getConnection()
        const idRol = rolMap[req.body.tipoUsuario]
        const result = await pool.request().query(`
          INSERT INTO Usuario (nombreUsuario, nombre, password, correo, telefono, tipoUsuario, idRol, idEstado)
          VALUES (
            '${req.body.nombreUsuario}', 
            '${req.body.nombre}', 
            '${req.body.password}', 
            '${req.body.correo}', 
            '${req.body.telefono}', 
            '${req.body.tipoUsuario}', 
            '${idRol}', 
            1
          )
        `)
        console.log('exito al registrar')
        res.json(result.recordset)
    } catch (error) {
        console.error('Error en endpoint /api/usuarios:', error)
        res.status(500).json({
            error: 'Error al obtener usuarios',
            details: error.message,
            fullError: error
        })
    }
})

export default router
