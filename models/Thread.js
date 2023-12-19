const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const threadSchema = new Schema(
  {
    Question: {
      type: String,
      required: true,
    },
    Subject: {
      type: String
    },
    StudentID: {
      type: Number,
    }
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ThreadStack", threadSchema);
