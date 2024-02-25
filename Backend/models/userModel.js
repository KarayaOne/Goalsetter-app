const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: ['true', 'Email already exists']
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    phone: {
        type: String,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);