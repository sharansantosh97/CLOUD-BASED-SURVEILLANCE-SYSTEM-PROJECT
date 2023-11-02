const User = require('../models/user');

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        next(error);
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

const createUser = async (req, res, next) => {
    let body = req.body;
    try {
        const newUser = await User.create(body);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try{
        let user = await User.findOne({ _id: req.params.id });
        if(user) {
            user.username = req.body.username;
            user.password = req.body.password;
            user.email = req.body.email;
            user.role = req.body.role;
            const updatedUser = await User.updateOne({ _id: req.params.id }, user);
            res.status(200).json(updatedUser);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (user) {
            const deletedUser = await User.deleteOne({ _id: req.params.id });
            res.status(200).json(deletedUser);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}

