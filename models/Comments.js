const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentsSchema = new Schema({
    CommentID: {
        type: Number,
        required: true,
    },
    ThreadID: {
        type: Number,
        required: true
    },
    StudentID: {
        type: Number,
        required: true
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
