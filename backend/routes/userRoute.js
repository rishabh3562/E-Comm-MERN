const router = require("express").Router();
const { registerUser, getUser, loginUser,getUserById } = require('../controllers/userController');

router.route("/register").post(registerUser);
router.route("/users").get(getUser)
router.route("/users/:id").get(getUserById)
router.route("/login").post(loginUser);
module.exports = router;
