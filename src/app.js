require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');
const activityRoutes = require('./routes/activityRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
connectDB();

// Rutas
app.use('/auth', authRoutes);
app.use('/trips', tripRoutes);
app.use('/trips', activityRoutes);
app.use('/share', shareRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Travel Planner API funcionando 🚀' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});