const mongoose = require('mongoose')
const FlashStack = require('../models/FlashStacks')

const index = async (req, res) => {
    const flashStacks = await FlashStack.find({}).sort({ createdAt: -1 }) //descending order
    res.status(200).json(flashStacks)
}

module.exports = {
    index
}
