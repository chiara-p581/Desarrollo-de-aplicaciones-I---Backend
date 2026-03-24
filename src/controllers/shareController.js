const Trip = require('../models/Trip');
const Activity = require('../models/Activity');

const getSharedTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({ shareToken: req.params.shareToken });

    if (!trip) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }

    const activities = await Activity.find({ tripId: trip._id }).sort({ date: 1, order: 1 });

    res.json({
      trip: {
        title: trip.title,
        destinations: trip.destinations,
        description: trip.description,
        startDate: trip.startDate,
        endDate: trip.endDate,
        coverImage: trip.coverImage,
      },
      activities,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

module.exports = { getSharedTrip };