const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');
// Create new product => /api/v1/admin/product/new
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const createdProduct = await Product.create(req.body);
    res.status(201).json({ createdProduct });
});



// Get all products => /api/v1/products?keyword=apple
// Get all products => /api/v1/products?keyword=apple
exports.getAlltProducts = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 4;

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage); // Call pagination before executing the query

    const productsCount = await Product.countDocuments();

    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;

    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        filteredProductsCount,
        products
    });
});

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    const product = await Product.findById(id);

    // console.log("\n\n product is :", product)
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    });

    // res.send({ message:id})
})


exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

});


exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

});



