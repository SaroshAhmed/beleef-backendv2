// config.js
require("dotenv").config();

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  REACT_APP_FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL,
  RESTRICTED_DOMAIN: process.env.RESTRICTED_DOMAIN,
  SECRET_KEY: process.env.SECRET_KEY,
  DOMAIN_API_KEY:process.env.DOMAIN_API_KEY,
  OPENAI_API_KEY:process.env.OPENAI_API_KEY,
  GOOGLE_MAPS_API_KEY:process.env.GOOGLE_MAPS_API_KEY,
  STRIPE_PRIVATE_KEY:process.env.STRIPE_PRIVATE_KEY,
  MAIL_USER:process.env.MAILUSER,
  MAIL_PASS:process.env.MAILPASS
};
