// index.js (o server.js)

const express = require('express');
const cors = require('cors');
const usuariosRoutes = require('./routes/usuarios'); // Ajusta la ruta si es necesario

const app = express();
const PORT = 3000;

// Middleware para aceptar solicitudes JSON y CORS
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/usuarios', usuariosRoutes);

// Ruta raíz para comprobar que el servidor funciona
app.get('/', (req, res) => {
  res.send('Servidor backend corriendo');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
