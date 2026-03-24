const Trip = require('../models/Trip');

// obtener todos los viajes del usuario
const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// obtener un viaje por id
const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, userId: req.userId });
    if (!trip) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// crear un viaje
const createTrip = async (req, res) => {
  try {
    const { title, destinations, description, startDate, endDate, coverImage } = req.body;

    const trip = await Trip.create({
    userId: req.userId,
    title,
    destinations,
    description: description || null,
    startDate,
    endDate,
    coverImage: coverImage || null,
    });

    res.status(201).json(trip);
} catch (error) {    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// editar un viaje
const updateTrip = async (req, res) => {
  try {
    const { title, destinations, description, startDate, endDate, coverImage } = req.body;

    const trip = await Trip.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { title, destinations, description, startDate, endDate, coverImage },
    { new: true }
    );

    if (!trip) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }

    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// eliminar un viaje
const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!trip) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }

    res.json({ message: 'Viaje eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

module.exports = { getTrips, getTripById, createTrip, updateTrip, deleteTrip };