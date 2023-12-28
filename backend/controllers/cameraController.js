const Alert = require('../models/alert');
const Camera = require('../models/camera');
const Building = require('../models/building');

const getNames = async (req, res, next) => {
    try {
      const cameras = await Camera.find({}, 'name');
      const cameraNames = cameras.map(camera => camera.name);
      res.json({ cameraNames });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };

const getCameras = async (req, res, next) => {
    try {
        const cameras = await Camera.find();
        const alerts = await Alert.find();
        const buildings = await Building.find();
        let result = [];
        for(let camera of cameras) {
            let data = JSON.parse(JSON.stringify(camera));
            data.alerts = alerts.filter(alert => alert.cameraId?.toString() === camera._id?.toString());
            let building = buildings.find(building => building?._id?.toString() === camera?.buildingId?.toString());
            data.buildingName = building?.name;
            result.push(data);
          }
        res.status(200).json({ cameras: result });
    } catch (error) {
        next(error);
    }
};

const getCamerasByFilters = async (req, res, next) => {
    try {
        let query = {};
        if (req.query.buildingName) {
            query.buildingId = req.query.buildingName;
        }
        if (req.query.cameraId) {
            query.cameraId = Number(req.query.cameraId);
        }
        if (req.query.buildingId) {
            query.buildingId = req.query.buildingId;
        }
        const cameras = await Camera.find(query);
        res.status(200).json({ cameras });
    } catch (error) {
        next(error);
    }
}

const createCamera = async (req, res, next) => {
    const camera = new Camera(req.body);
    try {
        const newCamera = await camera.save();
        res.status(201).json(newCamera);
    } catch (error) {
        next(error);
    }
};

const updateCamera = async (req, res, next) => {
    try {
        const camera = await Camera.findOne({ cameraId: req.params.cameraId });
        if (camera) {
            const updatedCameraData = req.body;
            Object.keys(updatedCameraData).forEach(key => {
                // Update only the fields that are present in the request body
                    camera[key] = updatedCameraData[key];
            });
            const updatedCamera = await camera.save();
            console.log("updatedCamera", updatedCamera);
            res.status(200).json(updatedCamera);
        } else {
            res.status(404).json({ message: 'Camera not found' });
        }
    } catch (error) {
        next(error);
    }
};

const deleteCamera = async (req, res, next) => {
    try {
        const camera = await Camera.findOne({ _id: req.params.id });
        if (camera) {
            const cameraDeleted = await Camera.deleteOne({ _id: req.params.id });
            res.status(200).json(cameraDeleted);
        } else {
            res.status(404).json({ message: 'Camera not found' });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { getNames, getCameras, getCamerasByFilters, createCamera, updateCamera, deleteCamera };

