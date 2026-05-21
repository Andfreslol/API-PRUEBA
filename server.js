const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// =====================================
// RUTA PRINCIPAL
// =====================================

app.get("/", (req, res) => {

    res.send("API funcionando correctamente");
});

// =====================================
// BASE DE DATOS TEMPORAL
// =====================================

let usuarios = [];

// =====================================
// OBTENER TODOS LOS USUARIOS
// =====================================

app.get('/usuarios', (req, res) => {

    res.json(usuarios);
});

// =====================================
// AGREGAR USUARIO
// =====================================

app.post('/usuarios', (req, res) => {

    const { nombre, correo, clave } = req.body;

    // Validar campos
    if (!nombre || !correo || !clave) {

        return res.status(400).json({
            mensaje: 'Faltan datos'
        });
    }

    // Crear usuario
    const nuevoUsuario = {

        id: usuarios.length + 1,
        nombre: nombre,
        correo: correo,
        clave: clave
    };

    // Guardar usuario
    usuarios.push(nuevoUsuario);

    res.status(201).json({

        mensaje: 'Usuario agregado correctamente',
        usuario: nuevoUsuario
    });
});

// =====================================
// LOGIN
// =====================================

app.post('/login', (req, res) => {

    const { nombre, clave } = req.body;

    // Buscar usuario
    const usuario = usuarios.find(
        u => u.nombre === nombre && u.clave === clave
    );

    // Si no existe
    if (!usuario) {

        return res.status(401).json({
            mensaje: 'Usuario o clave incorrectos'
        });
    }

    // Si existe
    res.json({
        mensaje: 'Login correcto',
        usuario: usuario
    });
});

// =====================================
// BUSCAR USUARIO POR ID
// =====================================

app.get('/usuarios/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const usuario = usuarios.find(
        u => u.id === id
    );

    if (!usuario) {

        return res.status(404).json({
            mensaje: 'Usuario no encontrado'
        });
    }

    res.json(usuario);
});

// =====================================
// SERVIDOR
// =====================================

app.listen(PORT, () => {

    console.log(
        `Servidor ejecutándose en puerto ${PORT}`
    );
});