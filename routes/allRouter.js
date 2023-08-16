const router = require("express").Router();

const { getAllStories, getAStory } = require("../controllers/storyController");

//router to get stories regardless of user
router.get("/", getAllStories);
router.get("/:storyId", getAStory);

module.exports = router;
