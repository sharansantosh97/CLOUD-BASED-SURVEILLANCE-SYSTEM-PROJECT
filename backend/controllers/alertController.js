const Alert = require('../models/alert');

const getAlerts = async (req, res, next) => {
    try {
        const alerts = await Alert.find();
        res.status(200).json({ alerts });
    } catch (error) {
        next(error);
    }
}

const getAlertsByFilters = async (req, res, next) => {
    try {
        let query = {};
        if (req.query.cameraId) {
            query.cameraId = req.query.cameraId;
        }
        if (req.query.type) {
            query.type = req.query.type;
        }
        if (req.query.priority) {
            query.priority = req.query.priority;
        }
        if (req.query.isRead) {
            query.isRead = req.query.isRead;
        }
        const alerts = await Alert.find(query);
        res.status(200).json({ alerts });
    } catch (error) {
        next(error);
    }
}

const createAlert = async (req, res, next) => {
    let body = req.body;
    try {
        const alert = new Alert(body);
        const newAlert = await alert.save();
        res.status(201).json(newAlert);
    } catch (error) {
        next(error);
    }
}

const updateAlert = async (req, res, next) => {
    try{
        let alert = await Alert.findOne({ _id: req.params.id });
        if(alert) {
            alert.isRead = req.body.isRead;
            alert.priority = req.body.priority;
            alert.type = req.body.type;
            alert.cameraId = req.body.cameraId;
            alert.timestamp = req.body.timestamp;
            alert.imageUrl = req.body.imageUrl;
            alert.videoUrl = req.body.videoUrl;
            alert.description = req.body.description;
            const updatedAlert = await Alert.updateOne({ _id: req.params.id }, alert);
            res.status(200).json(updatedAlert);
        }
        else {
            res.status(404).json({ message: 'Alert not found!' });
        }
    } catch (error) {
        next(error);
    }
}

const deleteAlert = async (req, res, next) => {
    try {
        const alert = await Alert.findByIdAndDelete({ _id: req.params.id });
        if (alert) {
            res.status(200).json({ message: 'Alert deleted' });
        }
        else {
            res.status(404).json({ message: 'Alert not found!' });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAlerts,
    getAlertsByFilters,
    createAlert,
    updateAlert,
    deleteAlert
}
