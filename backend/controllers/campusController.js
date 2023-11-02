const Campus = require('../models/campus');
const Building = require('../models/building');

const getCampuses = async (req, res, next) => {
    try {
        const campuses = await Campus.find();
        for(let campus of campuses) {
            campus.buildings = await Building.find({campusId: campus._id});
        }
        res.status(200).json({ campuses });
    } catch (error) {
        next(error);
    }
}

const getCampusesByFilters = async (req, res, next) => {
    try {
        let query = {};
        if (req.query.campusName) {
            query.name = req.query.campusName;
        }
        if (req.query.campusId) {
            query.campusId = req.query.campusId;
        }
        const campuses = await Campus.find(query);
        res.status(200).json({ campuses });
    } catch (error) {
        next(error);
    }
}

const createCampus = async (req, res, next) => {
    const campus = new Campus(req.body);
    try {
        const newCampus = await campus.save();
        res.status(201).json(newCampus);
    } catch (error) {
        next(error);
    }
}

const updateCampus = async (req, res, next) => {
    try {
        const campus = await Campus.findOne({ campusId: req.params.campusId });
        if (campus) {
            campus.name = req.body.name;
            campus.address = req.body.address;
            campus.city = req.body.city;
            campus.state = req.body.state;
            campus.zipCode = req.body.zipCode;
            const updatedCampus = await Campus.updateOne({ campusId: req.params.campusId }, campus);
            res.status(200).json(updatedCampus);
        } else {
            res.status(404).json({ message: 'Campus not found' });
        }
    } catch (error) {
        next(error);
    }
}

const deleteCampus = async (req, res, next) => {
    try {
        const campus = await Campus.findOne({ campusId: req.params.campusId });
        if (campus) {
            await campus.remove();
            res.status(200).json({ message: 'Campus deleted' });
        } else {
            res.status(404).json({ message: 'Campus not found' });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getCampuses,
    getCampusesByFilters,
    createCampus,
    updateCampus,
    deleteCampus
};
