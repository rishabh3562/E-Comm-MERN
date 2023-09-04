const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// const fileUpload = require("express-fileupload");
const path = require("path");


// const errorMiddleware = require("./middleware/error");
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config/config.env" });
}
// Config
console.log("Inside app.js");
// console.log("process.env.NODE_ENV", process.env.NODE_ENV);
app.use(express.json());
app.use(cookieParser());



// Route Imports
/*
//Not required right now
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
*/
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middleware for Errors
// app.use(errorMiddleware);

module.exports = app;