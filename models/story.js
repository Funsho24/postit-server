const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Story Title is required"],
  },
  description: {
    type: String,
    required: [true, "story Description is required"],
  },
  tags: {
    type: String,
    enum: ["nature", "lifestyle", "sport", "technology", "others"],
    required: [true, "story tag is required"],
  },
  image: {
    type: String,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "please provide a user"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("story", storySchema)