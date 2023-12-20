const mongoose = require('mongoose')
const FlashStack = require('../models/FlashStacks')

const index = async (req, res) => {
    const flashStacks = await FlashStack.find({}).sort({ createdAt: -1 }) //descending order
    res.status(200).json(flashStacks)
}

const create = async (req, res) => {
    const { StudentID, topic, cardCount, stackTimer } = req.body

    try {
        const flashStack = await FlashStack.create({ StudentID, topic, cardCount, stackTimer })
        res.status(201).json(flashStack)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const show = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'This ID is not valid' })
    }

    const flashStack = await FlashStack.findById(id)
    if (!flashStack) {
        return res.status(404).json({ error: 'flashStack with this ID does not exist!' })
    }
    res.status(200).json(flashStack)
}

const destroy = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'This ID is not valid' })
    }

    const flashStack = await FlashStack.findOneAndDelete({ _id: id })
    if (!flashStack) {
        return res.status(400).json({ error: 'flashStack with this ID does not exist!' })
    }
    res.status(200).json(flashStack)
}

const update = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'This ID is not valid' })
    }

    const flashStack = await FlashStack.findOneAndUpdate({ _id: id }, {
        stackTimer: flashStacksSchema.updatedAt
    })

    if (!flashStack) {
        return res.status(400).json({ error: 'flashStack with this ID does not exist!' })
    }
    res.status(200).json(flashStack)
}

module.exports = {
    index,
    create,
    show,
    destroy,
    update
}
