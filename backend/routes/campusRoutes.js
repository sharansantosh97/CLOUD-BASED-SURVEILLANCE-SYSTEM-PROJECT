const express = require('express');
const router = express.Router();
const campusController = require('../controllers/campusController');

router.get('/', campusController.getCampuses);
// router.get('/:id', campusController.getCampusById);
router.post('/', campusController.createCampus);
router.put('/:id', campusController.updateCampus);
router.delete('/:id', campusController.deleteCampus);

module.exports = router;