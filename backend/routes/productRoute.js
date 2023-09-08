const router = require("express").Router();
const { getProducts ,createProduct} = require("../controllers/productController");
router.route("/products").get(getProducts);
router.route("/products/new").post(createProduct)
module.exports = router;