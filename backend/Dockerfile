# Use official Node.js 18 (stable, fast, production-grade)
FROM node:18-alpine

# Create app directory inside container
WORKDIR /app

# Copy dependency files first (for faster rebuilds)
COPY package*.json ./

# Install backend dependencies
RUN npm install --production

# Copy the rest of the backend source code
COPY . .

# Tell Docker this container listens on port 3000
EXPOSE 3000

# Start the Express server
CMD ["node", "server.js"]
