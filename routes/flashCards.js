const express = require('express')
const router = express.Router()

const flashCardController = require('../controllers/flashCardsController')

router.get('/', flashCardController.index)
router.get('/:id', flashCardController.getById)
router.post('/', flashCardController.createNewCard)
router.patch('/:id', flashCardController.updateCard)
router.delete('/:id', flashCardController.destroyCard)

module.exports = router
