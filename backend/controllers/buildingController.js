const Building = require('../models/building');
const _ = require('lodash');
const Campus = require('../models/campus');
const Camera = require('../models/camera');

const getNames = async (req, res, next) => {
  try {
    const buildings = await Building.find({}, 'name');
    const buildingNames = buildings.map(building => building.name);
    res.json({ buildingNames });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getBuildings = async (req, res, next) => {
  try {
    const buildings = await Building.find();
    for(let building of buildings) {
      building.cameras = await Camera.find({buildingId: building._id});
    }
    res.status(200).json({ buildings });
  } catch (error) {
    next(error);
  }
}

const getBuildingsByFilters = async (req, res, next) => {
  try {
    let query = {};
    if (req.query.buildingName) {
      query.name = req.query.buildingName;
    }
    if (req.query.buildingId) {
      query.buildingId = req.query.buildingId;
    }
    const buildings = await Building.find(query);
    res.status(200).json({ buildings });
  } catch (error) {
    next(error);
  }
}

const createBuilding = async (req, res, next) => {
  let body = req.body;
  try {
    console.log("Body: " + JSON.stringify(body));
    const building = new Building(body);
    console.log("first building: " + JSON.stringify(building));
    const newBuilding = await building.save();
    res.status(201).json(newBuilding);
  } catch (error) {
    next(error);
  }
}

const updateBuilding = async (req, res, next) => {
  try{
    const building = await Building.findOne({ _id: req.params.id });
    if (building) {
      building.name = req.body.name;
      building.address = req.body.address;
      building.city = req.body.city;
      building.state = req.body.state;
      building.zipCode = req.body.zipCode;
      const updatedBuilding = await building.save();
      res.status(200).json(updatedBuilding);
    }
    else {
      res.status(404).json({ message: 'Building not found' });
    }
  } catch (error) {
    next(error);
  }
}

const deleteBuilding = async (req, res, next) => {
  try {
    console.log("Params id: " + req.params.id);
    const building = await Building.findByIdAndDelete({ _id: req.params.id });
    if (building) {
      res.status(200).json({ message: 'Building removed' });
    }
    else {
      res.status(404).json({ message: 'Building not found' });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getBuildings,
  getBuildingsByFilters,
  createBuilding,
  updateBuilding,
  deleteBuilding,
  getNames
};
