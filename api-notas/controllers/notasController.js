const pool = require('../db/connection');

// Obtener todas las notas de un usuario
const obtenerNotas = async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const resultado = await pool.query(
      'SELECT * FROM notas WHERE usuario_id = $1 ORDER BY id DESC',
      [usuario_id]
    );
    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener notas' });
  }
};

// Crear una nueva nota y devolverla
const crearNota = async (req, res) => {
  const { usuario_id, titulo, contenido } = req.body;

  if (!usuario_id || !titulo || !contenido) {
    return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
  }

  try {
    const resultado = await pool.query(
      'INSERT INTO notas (usuario_id, titulo, contenido) VALUES ($1, $2, $3) RETURNING *',
      [usuario_id, titulo, contenido]
    );

    // Devolvemos la nota recién creada con su ID
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear nota' });
  }
};

// Actualizar una nota existente
const actualizarNota = async (req, res) => {
  const { id } = req.params;
  const { titulo, contenido } = req.body;

  try {
    const resultado = await pool.query(
      'UPDATE notas SET titulo = $1, contenido = $2 WHERE id = $3',
      [titulo, contenido, id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensaje: 'Nota no encontrada' });
    }

    res.json({ mensaje: 'Nota actualizada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar nota' });
  }
};

// Eliminar una nota
const eliminarNota = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await pool.query(
      'DELETE FROM notas WHERE id = $1',
      [id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensaje: 'Nota no encontrada' });
    }

    res.json({ mensaje: 'Nota eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar nota' });
  }
};

module.exports = {
  obtenerNotas,
  crearNota,
  actualizarNota,
  eliminarNota
};
