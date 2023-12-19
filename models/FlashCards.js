const mongoose = require('mongoose')

const Schema = mongoose.Schema

const flashCardSchema = new Schema({
    cardID: {
        type: Number,
    },
    stackID: {
        type: String,
        required: true
    },
    frontSide: {
        type: String,
        required: true
    }, 
    backSide: { 
        type: String, 
        required: true
    }, 
    passed: {
        type: Boolean, 
        default: false
    },
},

    {
        timestamps: true
    })

module.exports = mongoose.model('FlashCard', flashCardSchema)
