const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [3, 'Username must be at least 3 characters long'] //here 3 is min length and everything inside '' is error message
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [13, 'Email must be at least 13 characters long']
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: [5, 'Password must be at least 5 characters long']
    }
});

module.exports = mongoose.model('User', userSchema); //'User' is the name of the collection and userSchema is the schema