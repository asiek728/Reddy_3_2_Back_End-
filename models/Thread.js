const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const threadSchema = new Schema(
  {
    ThreadID: {
      type: Number,
      required: true,
    },
    Question: {
      type: String,
      required: true,
    },
    StudentID: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ThreadStack", threadSchema);
