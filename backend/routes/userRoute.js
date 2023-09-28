const router = require("express").Router();
const { registerUser, getUser, loginUser } = require('../controllers/userController');

router.route("/register").post(registerUser);
router.route("/users").get(getUser)
router.route("/login").post(loginUser);
module.exports = router;
