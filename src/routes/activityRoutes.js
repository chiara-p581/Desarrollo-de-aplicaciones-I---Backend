const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'activity routes funcionando' });
});

module.exports = router;