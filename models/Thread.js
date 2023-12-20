const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const threadSchema = new Schema(
  {
    StudentID: {
      type: String,
      required: true
    },
    Question: {
      type: String,
      required: true,
    },
    Subject: {
      type: String,
      required: true
    }
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ThreadStack", threadSchema);
