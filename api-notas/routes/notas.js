const express = require('express');
const router = express.Router();
const {
  obtenerNotas,
  crearNota,
  actualizarNota,
  eliminarNota
} = require('../controllers/notasController');

// Obtener todas las notas de un usuario
router.get('/:usuario_id', obtenerNotas);

// Crear una nota
router.post('/', crearNota);

// Actualizar nota por id
router.put('/:id', actualizarNota);

// Eliminar nota por id
router.delete('/:id', eliminarNota);

module.exports = router;
