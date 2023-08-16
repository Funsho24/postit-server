const router = require('express').Router()

const {
  getAUserstory,
  getAllUserStories,
  createStory,
  editStory,
  deleteStory,
} = require("../controllers/storyController");



// route for user
router.route('/').get(getAllUserStories).post(createStory)
router.route('/:storyId').get(getAUserstory).patch(editStory).delete(deleteStory)

module.exports = router