const router = require("express").Router();
const { getProducts } = require("../controllers/productController");
router.route("/products").get(getProducts);

module.exports = router;