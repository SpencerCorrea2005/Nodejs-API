// se importan express, bcrypt y jwt para crear las rutas de autenticacion
// se importa además el modelo de usuario creado en la carpeta models

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // se encripta la contraseña a través del método de bcrypt.hash
    const newUser = new User({ username, email, password: hashedPassword }); //se crea un nuevo usuario
    await newUser.save(); // se guarda la informacion registrada
    res.status(201).send('Usuario registrado');
});

// Inicio de sesion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Usuario no encontrado');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json('Wrong password');

    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
})

module.exports = router;

