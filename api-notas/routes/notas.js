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

// Crear una nueva nota
router.post('/', crearNota);

// Actualizar una nota por ID
router.put('/:id', actualizarNota);

// Eliminar una nota por ID
router.delete('/:id', eliminarNota);

module.exports = router;
