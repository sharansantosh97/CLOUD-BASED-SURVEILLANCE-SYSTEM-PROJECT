const express = require('express');
const router = express.Router();
const cameraController = require('../controllers/cameraController');

router.get('/', cameraController.getCameras);
router.get('/getList', cameraController.getNames);
router.get('/filters', cameraController.getCamerasByFilters);
router.post('/', cameraController.createCamera);
router.put('/:id', cameraController.updateCamera);
router.delete('/:id', cameraController.deleteCamera);

module.exports = router;