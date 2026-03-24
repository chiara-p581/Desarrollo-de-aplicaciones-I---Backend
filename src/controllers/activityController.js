const Activity = require('../models/Activity');
const Trip = require('../models/Trip');

// obtener todas las actividades de un viaje
const getActivities = async (req, res) => {
  try {
    // verificar que el viaje pertenece al usuario
    const trip = await Trip.findOne({ _id: req.params.tripId, userId: req.userId });
    if (!trip) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }

    const activities = await Activity.find({ tripId: req.params.tripId }).sort({ date: 1, order: 1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// crear una actividad
const createActivity = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.tripId, userId: req.userId });
    if (!trip) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }

    const { title, place, date, time, notes, order } = req.body;

    const activity = await Activity.create({
      tripId: req.params.tripId,
      title,
      place: place || null,
      date,
      time: time || null,
      notes: notes || null,
      order: order || 0,
    });

    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// editar una actividad
const updateActivity = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.tripId, userId: req.userId });
    if (!trip) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }

    const { title, place, date, time, notes, order } = req.body;

    const activity = await Activity.findOneAndUpdate(
      { _id: req.params.id, tripId: req.params.tripId },
      { title, place, date, time, notes, order },
      { new: true }
    );

    if (!activity) {
      return res.status(404).json({ message: 'Actividad no encontrada' });
    }

    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// eliminar una actividad
const deleteActivity = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.tripId, userId: req.userId });
    if (!trip) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }

    const activity = await Activity.findOneAndDelete({
      _id: req.params.id,
      tripId: req.params.tripId,
    });

    if (!activity) {
      return res.status(404).json({ message: 'Actividad no encontrada' });
    }

    res.json({ message: 'Actividad eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

module.exports = { getActivities, createActivity, updateActivity, deleteActivity };