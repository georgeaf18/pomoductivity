/**
 * Health Routes
 * Defines health check endpoints
 */

const express = require('express');
const router = express.Router();
const healthController = require('../controllers/health.controller');

router.get('/', healthController.check.bind(healthController));

module.exports = router;
