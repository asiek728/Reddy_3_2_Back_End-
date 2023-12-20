const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentsSchema = new Schema({
    StudentID: {
        type: String,
        required: true
    },
    ThreadID: {
        type: String
    },
    comment: { 
        type: String,
        required: true
    }
},

    {
        timestamps: true
    })

module.exports = mongoose.model('Comments', commentsSchema)
