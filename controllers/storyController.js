const Story = require("../models/story");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find().populate("createdBy");
    res.status(200).json({ success: true, stories })
  } catch (error) {
    res.json(error);
  }
};

const getAStory = async (req, res) => {
  const { storyId } = req.params;
  try {
    const story = await Story.findById({ _id: storyId }).populate("createdBy");
    res.status(200).json({ success: true, story });
  } catch (error) {
    res.json(error);
  }
};

const getAllUserStories = async (req, res) => {
  const { userId } = req.user;
  try {
    const stories = await Story.find({ createdBy: userId }).populate(
      "createdBy"
    );
    res.status(200).json({ sucess: true, stories });
  } catch (error) {
    res.json(error);
  }
};

const getAUserstory = async (req, res) => {
  const { userId } = req.user;
  const { storyId } = req.params;
  try {
    const story = await Story.findOne({
      _id: storyId,
      createdBy: userId,
    }).populate("createdBy");
    res.status(200).json({ success: true, story });
  } catch (error) {
    res.json(error);
  }
};

const createStory = async (req, res) => {
  const { userId } = req.user;
  try {
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        use_filename: true,
        folder: "postitimages",
      }
    );
    console.log(result.secure_url);
    req.body.image = result.secure_url;
    fs.unlinkSync(req.files.image.tempFilePath);
    req.body.createdBy = userId;
    const story = await Story.create({ ...req.body });
    res.status(201).json({ success: true, story });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const editStory = async (req, res) => {
  const { userId } = req.user;
  const { storyId } = req.params;
  try {
    const story = await Story.findOneAndUpdate(
      { _id: storyId, createdBy: userId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    res.json(error);
  }
};

const deleteStory = async (req, res) => {
  const { userId } = req.user;
  const { storyId } = req.params;
  try {
    const story = await Story.findOneAndDelete({
      _id: storyId,
      createdBy: userId,
    });
    res.status(200).json({ success: true, message: "successfully deleted" });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getAStory,
  getAUserstory,
  getAllStories,
  getAllUserStories,
  createStory,
  editStory,
  deleteStory,
};
