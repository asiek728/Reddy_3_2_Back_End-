const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentsSchema = new Schema({
    ThreadID: {
        type: String
    },
    StudentID: {
        type: Number
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
