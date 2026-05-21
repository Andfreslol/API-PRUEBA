const express = require('express')

const app = express()

app.use(express.json())

// Base de datos temporal
let usuarios = []

// =====================================
// OBTENER TODOS LOS USUARIOS
// =====================================

app.get('/usuarios', (req, res) => {

    res.json(usuarios)
})

// =====================================
// AGREGAR USUARIO
// =====================================

app.post('/usuarios', (req, res) => {

    const { nombre, correo, clave } = req.body

    // Validar campos
    if (!nombre || !correo || !clave) {

        return res.status(400).json({
            mensaje: 'Faltan datos'
        })
    }

    // Crear usuario
    const nuevoUsuario = {

        id: usuarios.length + 1,
        nombre: nombre,
        correo: correo,
        clave: clave
    }

    // Guardar usuario
    usuarios.push(nuevoUsuario)

    res.status(201).json({

        mensaje: 'Usuario agregado correctamente',
        usuario: nuevoUsuario
    })
})

// =====================================
// BUSCAR USUARIO POR ID
// =====================================

app.get('/usuarios/:id', (req, res) => {

    const id = parseInt(req.params.id)

    const usuario = usuarios.find(
        u => u.id === id
    )

    if (!usuario) {

        return res.status(404).json({
            mensaje: 'Usuario no encontrado'
        })
    }

    res.json(usuario)
})

// =====================================
// SERVIDOR
// =====================================

const PORT = 3000

app.listen(PORT, () => {

    console.log(
        `Servidor ejecutándose en puerto ${PORT}`
    )
})