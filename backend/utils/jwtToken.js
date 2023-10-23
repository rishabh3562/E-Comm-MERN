// const dotenv = require('dotenv');
// dotenv.config({ path: '../backend' });
// console.log(process.env.COOKIE_EXPIRE)
// console.log(process.env.PORT)
// console.log(process.env.COOKIE_EXPIRE)
// const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRE, 10);
const cookieExpireDays= 7;
if (isNaN(cookieExpireDays)) {
  throw new Error('Invalid COOKIE_EXPIRE value in your environment variables.');
}

// Calculate the expiration date by adding days to the current date
const expirationDate = new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000);

const options = {
  expires: expirationDate, // Use the calculated expiration date
  httpOnly: true,
};

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = {sendToken};
