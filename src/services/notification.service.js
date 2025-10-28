const fetch = require('node-fetch');
const { pushoverUserKey, pushoverApiToken } = require('../config/environment');
const { NOTIFICATION_EVENT_TYPES, SESSION_TYPE_NAMES } = require('../config/constants');

class NotificationService {
  async sendTimerNotification(eventType, sessionType, duration) {
    const message = this.formatMessage(eventType, sessionType, duration, new Date().toLocaleTimeString());
    await this.sendPushoverNotification(message, `Timer Event: ${SESSION_TYPE_NAMES[sessionType]}`);
  }

  formatMessage(eventType, sessionType, duration, timeOfDay) {
    return `${SESSION_TYPE_NAMES[sessionType]} session ${eventType.replace('timer', '').toLowerCase()} at ${timeOfDay} for ${duration} minutes.`;
  }

  async sendPushoverNotification(message, title) {
    const response = await fetch('https://api.pushover.net/1/messages.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: pushoverApiToken,
        user: pushoverUserKey,
        message: message,
        title: title
      })
    });
    if (!response.ok) {
      console.error('Failed to send Pushover notification:', response.statusText);
    }
  }
}

module.exports = new NotificationService();
