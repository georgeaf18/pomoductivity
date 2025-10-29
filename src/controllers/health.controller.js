/**
 * Health Controller
 * Handles health check requests
 */

class HealthController {
  /**
   * Health check endpoint
   * GET /api/health
   */
  check(req, res) {
    try {
      res.json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error during health check:', error);
      res.status(500).json({
        status: 'error',
        error: error.message
      });
    }
  }
}

export default new HealthController();
