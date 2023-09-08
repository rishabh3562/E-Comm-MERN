const Products = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// Create new product => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

    const product = await Products.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

// Get all products => /api/v1/products?keyword=apple
// Get all products => /api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 4;

    const apiFeatures = new APIFeatures(Products.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage); // Call pagination before executing the query

    const productsCount = await Products.countDocuments();

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
