const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');

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
  
   res.status(201).json({
        success: true,
        user,
    
   })

  });

  exports.getUser=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.find();
    res.status(200).json({
      success:true,
      user
    })  
  })
