/**
 * Pomoductivity API Server
 * REST API and WebSocket server for Pomodoro timer management
 */

const http = require('http');
const { WebSocketServer } = require('ws');
const app = require('./src/app');
const config = require('./src/config/environment');
const timerService = require('./src/services/timer.service');
const websocketService = require('./src/services/websocket.service');

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocketServer({ server });

// Setup WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('New WebSocket client connected');

  // Send current state to newly connected client
  const state = timerService.getState();
  ws.send(JSON.stringify(state));

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

// Initialize WebSocket service
websocketService.initialize(wss);

// Register timer state change callback to broadcast updates
timerService.onStateChange((state) => {
  websocketService.broadcast(state);
});

// Start server
server.listen(config.port, () => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`  Pomoductivity REST API Server`);
  console.log(`${'='.repeat(60)}\n`);
  console.log(`Environment:  ${config.nodeEnv}`);
  console.log(`Port:         ${config.port}`);
  console.log(`CORS Origin:  ${config.cors.origin}`);
  console.log(`\n${'='.repeat(60)}`);
  console.log(`  API Endpoints (Base: http://localhost:${config.port}/api)`);
  console.log(`${'='.repeat(60)}\n`);
  console.log(`Health Check:`);
  console.log(`  GET  /api/health\n`);
  console.log(`Timer Operations:`);
  console.log(`  GET  /api/timer/status      - Get current timer state`);
  console.log(`  GET  /api/timer/history     - Get session history`);
  console.log(`  POST /api/timer/start       - Start timer`);
  console.log(`  POST /api/timer/stop        - Stop timer`);
  console.log(`  POST /api/timer/start-stop  - Toggle timer`);
  console.log(`  POST /api/timer/reset       - Reset timer`);
  console.log(`  POST /api/timer/set-type    - Set session type`);
  console.log(`\nWebSocket:`);
  console.log(`  WS   ws://localhost:${config.port}\n`);
  console.log(`${'='.repeat(60)}\n`);
  console.log(`Server ready for connections!`);
  console.log(`API documentation: See docs/API.md\n`);
});
