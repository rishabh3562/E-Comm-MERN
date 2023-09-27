const router = require("express").Router();
const { registerUser,getUser } = require('../controllers/userController');

router.route("/register").post(registerUser);
router.route("/users").get(getUser)
module.exports = router;
