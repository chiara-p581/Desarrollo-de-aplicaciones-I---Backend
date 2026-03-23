const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'El título es obligatorio'],
      trim: true,
    },
    place: {
      type: String,
      trim: true,
      default: null,
    },
    date: {
      type: Date,
      required: [true, 'La fecha es obligatoria'],
    },
    time: {
      type: String,
      default: null, // formato "14:00"
    },
    notes: {
      type: String,
      trim: true,
      default: null,
    },
    order: {
      type: Number,
      default: 0, // para ordenar actividades dentro de un día
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Activity', activitySchema);