const express = require('express');
const router = express.Router();
const videoDataController = require('../controllers/videoDataController');




router.get('/', videoDataController.getVideoDataByFilters);

module.exports = router;
