const router = require("express").Router();
const { registerUser, loginUser, foundUser } = require("../controllers/authController");
const auth = require('../middleware/auth')

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", auth, foundUser)

module.exports = router;
