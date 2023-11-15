const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true, 
        required: 'Email is required'
    },
    password: {
        type: String,
        trim: true, 
        required: 'Password is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    role : {
        type: String,
        default: 'User',
        enum: ['User', 'Admin']
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;