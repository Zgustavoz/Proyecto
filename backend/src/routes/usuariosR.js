// import { Router } from 'express';
import { getConnection } from '../dataBase/connection.js'
import express from 'express'
import { mssql } from '../dataBase/connection.js'
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

    const { nombreUsuario, nombre, password, correo, telefono, tipoUsuario } =
        req.body

    const idRol = rolMap[tipoUsuario]

    try {
        const pool = await getConnection()

        const result = await pool
            .request()
            .input('nombreUsuario', nombreUsuario)
            .input('nombre', nombre)
            .input('password', password)
            .input('correo', correo)
            .input('telefono', telefono)
            .input('tipoUsuario', tipoUsuario)
            .input('idRol', idRol)
            .input('idEstado', 1)
            .output('resultado', mssql.Bit)
            .execute('sp_RegistrarUsuario')

        const fueInsertado = result.output.resultado

        if (fueInsertado) {
            res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente.'
            })
        } else {
            res.status(409).json({
                success: false,
                message: 'Ya existe un usuario con ese correo.'
            })
        }
    } catch (error) {
        console.error('Error en registrarUsuario:', error)
        res.status(500).json({
            error: 'Error al registrar usuario',
            details: error.message
        })
    }
})

export default router
