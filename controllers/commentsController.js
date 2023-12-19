const mongoose = require('mongoose')
const Comments = require('../models/Comments')


const index = async (req, res) => {
    const comment = await Comments.find({}).sort({ createdAt: -1 })
    res.status(200).json(comment)
}

const getComment = async (req, res) => {
    const { id } = req.params

    const comment = await Comments.find({ ThreadID: id})

    if(!comment){
        return res.status(404).json({error: 'Cannot find comment'})
    }

    res.status(200).json(comment)
}

const create = async (req, res) => {
    const { comment, ThreadID } = req.body
   // The IDs are hard coded need to fix later 

    try{
        const newComment = await Comments.create({ comment, ThreadID })
        res.status(200).json(newComment)
    } catch(err){
        res.status(400).json({ err: err.message})
    }
}
 
const deleteComment = async (req, res) => {
    const { id } = req.params

    try{
    const deleteComment = await Comments.findOneAndDelete({ThreadID : id})
    res.status(200).json(deleteComment)
    } catch(err){
        res.status(400).json({ err: err.message })
    }
}

const updateComment = async (req, res) => {
    const { id } = req.params

    const updateComment = await Comments.findByIdAndUpdate({_id: id}, { ...req.body })

    res.status(200).json(updateComment)
}


module.exports = {
    index,
    create,
    getComment,
    deleteComment,
    updateComment
}
