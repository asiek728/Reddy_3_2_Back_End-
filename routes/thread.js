const express = require("express");
const router = express.Router();

const threadController = require("../controllers/threadController");

router.get("/", threadController.index);
// router.post('/', threadController.create)
// router.get('/:id', threadController.show)
// router.delete('/:id', threadController.destroy)
// router.patch('/:id', threadController.update)

module.exports = router;
