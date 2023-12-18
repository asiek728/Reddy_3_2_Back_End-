const express = require('express')
const router = express.Router()

const flashStackController = require('../controllers/flashStackController')

router.get('/', flashStackController.index)

module.exports = router
