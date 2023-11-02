const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    isAdmin:{
        type:Boolean,
        required: true
    },
    status:{
        type:String
    },
    campusName: {
        type: String
    },
    phoneNumber: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;