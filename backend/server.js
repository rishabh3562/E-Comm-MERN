const app = require("./app");
const cloudinary = require("cloudinary");
const connectDB = require("./config/database");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {

    console.log(`Server is working on http://localhost:${port}`);
    connectDB();
});