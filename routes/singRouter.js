const express = require('express');
require('dotenv').config();
const router = express.Router();
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const FirmaJWT = process.env.FIRMA_JWT;

// Ruta para el registro de usuarios
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
      // Verifica si el usuario ya existe en la base de datos
      const existingUser = await userModel.findOne({ username });
  
      if (existingUser) {
        return res.status(400).json({ msg: 'El usuario ya existe' });
      }
     
      const newUser = new userModel({
        username,
        password, 
      });

      const savedUser = await newUser.save();
      res.status(201).json({savedUser, msg : 'Usuario registrado'})
    } catch (error) {
      res.status(500).json({ error, msg: 'Error al registrar el usuario' });
    }
});

// Ruta para el login de usuarios
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ msg: 'Credenciales inválidas' });
    }
    
    const payloadUsuario = {
      username: user.username
    }

    // Genera un token JWT después del login exitoso
    const token = jwt.sign(payloadUsuario, FirmaJWT);
    res.status(200).json({ token, msg: 'Inicio de sesion exitoso' });
  } catch (error) {
    res.status(500).json({ error, msg: 'Error al iniciar sesión' });
  }
});

module.exports = router;