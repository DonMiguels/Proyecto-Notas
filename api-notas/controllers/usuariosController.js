// controllers/usuariosController.js
const pool = require('../db/connection');

const registrarUsuario = async (req, res) => {
  const { nombre_usuario, contrasena } = req.body;
  try {
    const existe = await pool.query('SELECT * FROM usuarios WHERE nombre_usuario = $1', [nombre_usuario]);
    if (existe.rows.length > 0) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    await pool.query(
      'INSERT INTO usuarios (nombre_usuario, contrasena) VALUES ($1, $2)',
      [nombre_usuario, contrasena]
    );
    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const loginUsuario = async (req, res) => {
  const { nombre_usuario, contrasena } = req.body;
  try {
    const resultado = await pool.query(
      'SELECT * FROM usuarios WHERE nombre_usuario = $1 AND contrasena = $2',
      [nombre_usuario, contrasena]
    );

    if (resultado.rows.length === 0) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    res.status(200).json({ mensaje: 'Login exitoso', usuario: resultado.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = { registrarUsuario, loginUsuario };
