const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getTrips, getTripById, createTrip, updateTrip, deleteTrip } = require('../controllers/tripController');

router.use(authMiddleware); // protege todas las rutas de trips

router.get('/', getTrips);
router.get('/:id', getTripById);
router.post('/', createTrip);
router.put('/:id', updateTrip);
router.delete('/:id', deleteTrip);

module.exports = router;