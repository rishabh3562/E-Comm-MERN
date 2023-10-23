const router = require("express").Router();
const { registerUser, getUser, loginUser,getUserById } = require('../controllers/userController');
const {isAuthenticatedUser}=require("../middleware/auth")
router.route("/register").post(registerUser);
router.route("/users").get(getUser)
router.route("/users/:id").get(getUserById)
router.route("/login").post(isAuthenticatedUser,loginUser);
module.exports = router;
