/**
 * WebSocket Service
 * Manages WebSocket connections and broadcasting timer state updates
 */

class WebSocketService {
  constructor() {
    this.wss = null;
  }

  /**
   * Initialize WebSocket server
   * @param {WebSocketServer} wss - WebSocket server instance
   */
  initialize(wss) {
    this.wss = wss;

    this.wss.on('connection', ws => {
      console.log('New WebSocket client connected');

      ws.on('close', () => {
        console.log('WebSocket client disconnected');
      });

      ws.on('error', error => {
        console.error('WebSocket error:', error);
      });
    });
  }

  /**
   * Send initial state to a newly connected client
   * @param {WebSocket} ws - WebSocket connection
   * @param {Object} state - Initial state to send
   */
  sendInitialState(ws, state) {
    if (ws.readyState === 1) {
      // 1 = OPEN
      ws.send(JSON.stringify(state));
    }
  }

  /**
   * Broadcast state to all connected clients
   * @param {Object} state - State to broadcast
   */
  broadcast(state) {
    if (!this.wss) {
      console.warn('WebSocket server not initialized');
      return;
    }

    const message = JSON.stringify(state);
    this.wss.clients.forEach(client => {
      if (client.readyState === 1) {
        // 1 = OPEN
        client.send(message);
      }
    });
  }

  /**
   * Get connection handler for new WebSocket connections
   * @param {Function} getStateFunc - Function that returns current state
   * @returns {Function} Connection handler
   */
  getConnectionHandler(getStateFunc) {
    return ws => {
      console.log('New WebSocket client connected');

      // Send current state to newly connected client
      const state = getStateFunc();
      this.sendInitialState(ws, state);

      ws.on('close', () => {
        console.log('WebSocket client disconnected');
      });

      ws.on('error', error => {
        console.error('WebSocket error:', error);
      });
    };
  }
}

// Export singleton instance
export default new WebSocketService();
