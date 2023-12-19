const mongoose = require('mongoose')
const FlashCard = require('../models/FlashCards')

const index = async (req, res) => {
    const flashCard = await FlashCard.find({}).sort({ createdAt: -1 }) //descending order
    res.status(200).json(flashCard)
}

const getById = async (req, res) => {
    const { id } = req.params
    const thisCard = await FlashCard.find({ stackID: id })

    if(!thisCard){
        return res.status(404).json({error: "No such card"})
    }
    res.status(200).json(thisCard)

}

const createNewCard = async (req, res) => {
    const {stackID, frontSide, backSide} = req.body
    console.log("hit")
    try{
        const card = await FlashCard.create({stackID, frontSide, backSide,})
        res.status(200).json(card)

    }catch(error){
        res.status(400).json({error: error.message})
    }

}

const updateCard = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such card"})
    }

    const updatedCard = await FlashCard.findOneAndUpdate({_id: id},{
        ...req.body
    })

    
    if(!updateCard){
        return res.status(404).json({error: "No such card"})
    }
    res.status(200).json(updatedCard)



}

const destroyCard = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such card"})
    }
    const deletedCard = await FlashCard.findOneAndDelete({_id: id})

    if(!deletedCard){
        return res.status(404).json({error: "No such card"})
    }
    res.status(200).json(deletedCard)
}

module.exports = {
    index,
    getById,
    createNewCard,
    updateCard,
    destroyCard
}
