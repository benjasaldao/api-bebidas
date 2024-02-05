require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  recoveryJwtSecret: process.env.RECOVERY_JWT_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  smtpEmail: process.env.SMTP_EMAIL,
  smtpPassword: process.env.SMTP_PASSWORD,
};

module.exports = { config };
