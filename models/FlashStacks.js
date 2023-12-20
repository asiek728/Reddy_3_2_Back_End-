const mongoose = require('mongoose')

const Schema = mongoose.Schema

const flashStacksSchema = new Schema({
    StudentID: {
        type: String,
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
    userID: {
        type: String,
        required: true
    }
    
},

    {
        timestamps: true
    })

module.exports = mongoose.model('FlashStack', flashStacksSchema)
