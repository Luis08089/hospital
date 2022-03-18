require('dotenv').config();

module.exports = {
    APP: {
        ENV: process.env.APP_ENV || 'development',
    NAME: process.env.APP_NAME || 'Hospitals',
    URL: process.env.APP_URL,
    PORT: process.env.APP_PORT || 1338,     
    },
    DB: {
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
        DATABASE_NAME: process.env.DB_NAME,
        HOST: process.env.DB_HOST,
        PORT: Number(process.env.DB_PORT),
      },
      JWT: {
        SECRET_KEY: process.env.JWT_SECRET_KEY,
        EXPIRES_IN: process.env.JWT_EXPIRES_IN,
        REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
        REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
        PASSWORD_RECOVERY_SECRET_KEY: process.env.JWT_PASSWORD_RECOVERY_SECRET_KEY,
        PASSWORD_RECOVERY_EXPIRES_IN: process.env.JWT_PASSWORD_RECOVERY_EXPIRES_IN,
      },
      BCRYPT: {
        SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
      },

  };
