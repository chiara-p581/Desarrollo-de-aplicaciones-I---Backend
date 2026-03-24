const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getActivities, createActivity, updateActivity, deleteActivity } = require('../controllers/activityController');

router.use(authMiddleware);

router.get('/:tripId/activities', getActivities);
router.post('/:tripId/activities', createActivity);
router.put('/:tripId/activities/:id', updateActivity);
router.delete('/:tripId/activities/:id', deleteActivity);

module.exports = router;