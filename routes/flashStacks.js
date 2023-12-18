const express = require('express')
const router = express.Router()

const flashStackController = require('../controllers/flashStackController')

router.get('/', flashStackController.index)
router.post('/', flashStackController.create)
router.get('/:id', flashStackController.show)
router.delete('/:id', flashStackController.destroy)
router.patch('/:id', flashStackController.update)

module.exports = router
