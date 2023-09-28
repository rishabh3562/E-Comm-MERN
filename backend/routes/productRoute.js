const router = require("express").Router();
const { getAlltProducts, getProductDetails, updateProduct, deleteProduct, createProduct } = require("../controllers/productController");
router.route("/products").get(getAlltProducts);
router.route("/products/new").post(createProduct)
router.route("/products/details/:id").get(getProductDetails);


module.exports = router;