const express = require('express');
const { getGoogleFitData } = require('../controllers/googleFitController');

const router = express.Router();

router.get('/:userId/data', getGoogleFitData);

module.exports = router;
