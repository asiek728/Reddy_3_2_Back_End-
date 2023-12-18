const express = require('express')
const router = express.Router()

const commentsController = require('../controllers/commentsController')

router.get('/', commentsController.index)
router.get('/:id', commentsController.getComment)
router.post('/', commentsController.create)


module.exports = router
