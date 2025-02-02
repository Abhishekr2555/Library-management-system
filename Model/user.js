const mongoose = require('mongoose')

const user = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique:true
    },
    Password: {
        type: String,
        required: true,
    },
    Phone: {
        type: Number,
        required: true,
    },
    Address: {
        type: String,
        default:""
    },
    Gender: {
        type: String,
        required: true,
    },
    borrowBooks: {
        type: [],
        required: [],
    },
    usedPasswords: {
        type: [],
        required: [],
    },
    userRole: {
        type: String,
        enum: ["user", "admin"], 
        default: "user",
    },
    isActive: {
        type: Boolean,
        default: true,
    },
})

user.set('timestamps', true)

module.exports = mongoose.model('user', user)