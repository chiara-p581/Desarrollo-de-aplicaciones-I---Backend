const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const tripSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID is required"]
    },
    title: {
        type: String,
        required: [true, "A title for the trip is required"],
        trim: true
    },
    destinatios:{
        type: [String],
        required: [true, "At least one destination is required"],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    startDate: {
        type: Date,

    },
    endDate: {
        type: Date,
    },
    coverImage: {
      type: String,
      default: null,
    },
    shareToken: {
      type: String,
      unique: true,
      default: () => nanoid(10), // genera un código único de 10 caracteres
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model('Trip', tripSchema);