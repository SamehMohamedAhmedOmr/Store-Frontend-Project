import dotenv from 'dotenv';

dotenv.config();

const application_config = {
  name: process.env.APP_NAME,
  port: Number(process.env.PORT) || 3000,
  jwt_secret: process.env.JWT_SECRET,
  bcrypt_salt: Number(process.env.BCRYPT_ROUNDS) || 10,
  bcrypt_paper: process.env.BCRYPT_PASSWORD_PAPER,
};

export default application_config;
