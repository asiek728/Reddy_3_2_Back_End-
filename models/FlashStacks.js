const mongoose = require('mongoose')

const Schema = mongoose.Schema

const flashStacksSchema = new Schema({
    StackID: {
        type: Number,
        required: true,
    },
    StudentID: {
        type: Number,
        required: true
    },
    topic: {
        type: String,
        required: true
    }, 
    cardCount: { 
        type: Number,
        required: true
    }, 
    stackTimer: {
        type: Date,
        required: true
    },
},

    {
        timestamps: true
    })

module.exports = mongoose.model('FlashStack', flashStacksSchema)
