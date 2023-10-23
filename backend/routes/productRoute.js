const router = require("express").Router();
const { getAlltProducts, getProductDetails, updateProduct, deleteProduct, createProduct } = require("../controllers/productController");

const {isAuthenticatedUser,authorizeRoles}=require("../middleware/auth")
router.route("/products").get(isAuthenticatedUser,authorizeRoles("admin"),getAlltProducts);
router.route("/products/new").post(createProduct)

router.route("/products/:id").
get(getProductDetails)
.put(updateProduct)
.delete(deleteProduct);


module.exports = router;