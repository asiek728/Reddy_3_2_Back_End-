const express = require('express')
const router = express.Router()

const flashStackController = require('../controllers/flashStackController')

router.get('/', flashStackController.index)
// router.post('/', moviesController.create)
// router.get('/:id', moviesController.show)
// router.delete('/:id', moviesController.destroy)
// router.patch('/:id', moviesController.update)

module.exports = router
