const express = require('express')

const flashCardController = require('../controllers/flashCardsController')

const router = express.Router()

// auth block for notes without token 
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

router.get('/',  flashCardController.index)
router.get('/:id', flashCardController.getById)
router.post('/', flashCardController.createNewCard)
router.patch('/:id', flashCardController.updateCard)
router.delete('/:id', flashCardController.destroyCard)

module.exports = router
