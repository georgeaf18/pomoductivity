/**
 * Environment Configuration
 */

import { DEFAULT_PORT } from './constants.js';

export const port = process.env.PORT || DEFAULT_PORT;
export const nodeEnv = process.env.NODE_ENV || 'development';
export const corsOrigin = process.env.CORS_ORIGIN || '*'; // In production, set this to your Angular app URL

// CORS Configuration for Angular
export const cors = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:4200', // Default Angular dev port
  credentials: true,
  optionsSuccessStatus: 200
};

export const pushoverUserKey = process.env.PUSHOVER_USER_KEY || "";
export const pushoverApiToken = process.env.PUSHOVER_API_TOKEN || "";

// Default export for convenience
export default {
  port,
  nodeEnv,
  corsOrigin,
  cors,
  pushoverUserKey,
  pushoverApiToken
};
