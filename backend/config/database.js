const mongoose = require("mongoose");
// const colors = require("colors");
const dotenv = require("dotenv");
dotenv.config({path
  : "./config/config.env"});
// console.log("db.js")

const uri = process.env.MONGO_URI;
// console.log(uri);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`MongoDB Connected `);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
