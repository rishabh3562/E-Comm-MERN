const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');
const bcrypt = require('bcryptjs');
const { sendToken } = require('../utils/jwtToken');
// const bcrypt = require('bcrypt');
// const User = require('./models/User'); // Import your User model here

// Create a function to compare bcrypt hashed passwords




exports.registerUser = catchAsyncErrors(async (req, res, next) => {

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is myCloud.public_id",
      url: "this is myCloud.secure_url",
    },
  });
  const token = user.getJWTToken();
  res.status(201).json({
    success: true,
    token,
    user

  })

});

exports.getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    success: true,
    user
  })
})
exports.getUserById = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    success: true,
    user
  })
})
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler('Please enter email and password', 400));
  }


  // Finding the user in the database
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  // Comparing the provided password with the stored hashed password
  const isPasswordMatched = await user.compareBcryptPasswords(user.password, password);
  // console.log("\n\nisPasswordMatched: ", isPasswordMatched);
  // console.log("\n\nuser.schema.mtehods",user.schema.methods)
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  // If the password is correct, generate a JWT token and send a response
  sendToken(user, 200, res);

});


exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});



//not working , user.comaprePassword2 is not a function
/*
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  //checking if user has given email and password
  if (!email || !password) {
    return next(new ErrorHandler('Please enter email and password', 400))
  }
  //finding user in database
  const user = User.findOne({ email }).select('+password')
console.log("\n\nuser in login: ", user);
  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401))
  }
  //checking if password is correct or not
  console.log("\n\nuser in login: ", user.schema.methods);
  const isPasswordMatched = await user.comparePassword2(password)
  console.log("\n\nisPasswordMatched: ", isPasswordMatched);
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401))
  }
  const token = user.getJWTToken();
  res.status(200).json({
    success: true,
    token
  })
})


*/