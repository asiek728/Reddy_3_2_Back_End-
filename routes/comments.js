const express = require('express')
const router = express.Router()

const commentsController = require('../controllers/commentsController')

const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

router.get('/', commentsController.index)
router.get('/:id', commentsController.getComment)
router.post('/', commentsController.create)
router.delete('/:id', commentsController.deleteComment)
router.patch('/:id', commentsController.updateComment)

module.exports = router
