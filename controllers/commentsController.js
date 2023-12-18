const mongoose = require('mongoose')
const Comments = require('../models/Comments')


const index = async (req, res) => {
    const comment = await Comments.find({}).sort({ createdAt: -1 }) //descending order
    res.status(200).json(comment)
}

const getComment = async (req, res) => {
    const { id } = req.params

    const comment = await Comments.findById(id)

    if(!comment){
        return res.status(404).json({error: 'Cannot find comment'})
    }

    res.status(200).json(comment)
}

const create = async (req, res) => {
    const { CommentID, ThreadID, StudentID, comment } = req.body
   // The IDs are hard coded need to fix later 

    try{
        const newComment = await Comments.create({ CommentID, ThreadID, StudentID, comment })
        res.status(200).json(newComment)
    } catch(err){
        res.status(400).json({ err: err.message})
    }
}
 


module.exports = {
    index,
    create,
    getComment
}
