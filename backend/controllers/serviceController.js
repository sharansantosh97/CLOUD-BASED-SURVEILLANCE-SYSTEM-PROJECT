const Service = require('../models/service');

const getService = async (req, res, next) => {
    try {
        const service = await Service.find();
        res.status(200).json({ service });
    } catch (error) {
        next(error);
    }
}

const createService = async (req, res, next) => {
    let body = req.body;
    try {
        const newService = await Service.create(body);
        res.status(201).json(newService);
    } catch (error) {
        next(error);
    }
}

const deleteService = async (req, res, next) => {
    try {
        const service = await Service.findOne({ _id: req.params.id });
        if (service) {
            const deletedService = await Service.deleteOne({ _id: req.params.id });
            res.status(200).json(deletedService);
        }
        else {
            res.status(404).json({ message: 'Service not found' });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getService,
    createService,
    deleteService
}

