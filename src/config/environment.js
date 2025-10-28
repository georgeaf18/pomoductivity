/**
 * Environment Configuration
 */

const { DEFAULT_PORT } = require('./constants');

module.exports = {
  port: process.env.PORT || DEFAULT_PORT,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*', // In production, set this to your Angular app URL

  // CORS Configuration for Angular
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200', // Default Angular dev port
    credentials: true,
    optionsSuccessStatus: 200
  },
  pushoverUserKey: process.env.PUSHOVER_USER_KEY,
  pushoverApiToken: process.env.PUSHOVER_API_TOKEN,
};
