# Node.js API Dockerfile
FROM node:18-alpine AS base

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies (skip prepare scripts like husky)
RUN npm ci --omit=dev --ignore-scripts

# Copy application code
COPY . .

# Expose API port
EXPOSE 3000

# Run as non-root user
USER node

# Start the server
CMD ["node", "server.js"]
