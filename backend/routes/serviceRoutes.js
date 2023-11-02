const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.get('/', serviceController.getService);
router.delete('/:id', serviceController.deleteService);
router.post('/', serviceController.createService);

module.exports = router;