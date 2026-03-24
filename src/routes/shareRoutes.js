const express = require('express');
const router = express.Router();
const { getSharedTrip } = require('../controllers/shareController');

// ruta pública, sin authMiddleware
router.get('/:shareToken', getSharedTrip);

module.exports = router;