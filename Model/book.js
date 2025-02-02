const mongoose = require('mongoose')

const Book = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
    },
    bookDescription: {
        type: String,
        required: true,
    },
    bookAuthor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author', 
        required: true,
    },
    bookCategory: {
        type: String,
        default: 'common',
    },
    bookImage: {
        type: String,
        required: true,
    },
    bookStatus: {
        type: String,
        default: "available",
    },
    bookCost: {
        type: Number,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    }],
})

Book.set('timestamps', true)

module.exports = mongoose.model('Book', Book)