const mongoose = require("mongoose");
const Thread = require("../models/Thread");

const index = async (req, res) => {
  const thread = await Thread.find({}).sort({ createdAt: -1 }); //descending order
  res.status(200).json(thread);
};

const show = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such thread" });
  }

  const thread = await Thread.findById(id);

  if (!thread) {
    return res.status(404).json({ error: "No such thread" });
  }

  res.status(200).json(thread);
};

const create = async (req, res) => {
  const { Question, StudentID } = req.body;

  // add to the database
  try {
    const thread = await Thread.create({ Question, StudentID });
    res.status(200).json(thread);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  index,
  show,
  create,
};
