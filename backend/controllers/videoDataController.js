const VideoData = require('../models/videoData');
const Building = require('../models/building');

const getVideoDataByFilters = async (req, res, next) => {
  try {
    let query = {};
    if (req.query.start && req.query.end) {
      query.date = {
        $gte: new Date(req.query.start),
        $lte: new Date(req.query.end)
      };
    }
    if (req.query.buildingName) {
      const buildingIds = await Building.find({ name: new RegExp(req.query.buildingName, 'i') }).distinct('buildingId');
      query.buildingId = { $in: buildingIds };
    }
    if (req.query.cameraId) {
      query.cameraId = Number(req.query.cameraId);
    }
    console.log(query);
    const videoData = await VideoData.find(query);//.populate('buildingId').populate('cameraId');
    res.status(200).json({ videoData });
  } catch (error) {
    next(error);
  }
};

module.exports = { getVideoDataByFilters };

// // Get all users
// const getUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Create a new user
// const createUser = async (req, res) => {
//   const user = new User(req.body);
//   try {
//     const newUser = await user.save();
//     res.status(201).json(newUser);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };


// const getFullData = async (req, res) => {
//   try {
//     const data = await VideoData.find();
//     res.status(200).json({data});
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err.message });
//   }
// };

// const sample = async (req, res) => {
//   try {
//     // const VideoData = await VideoData.find();
//     res.status(200).json({"as":"Asas"});
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



