# Backend Dockerfile
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install global TypeScript
RUN npm install -g typescript

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy source files
COPY . .

# Remove any existing .js files in src to prevent conflicts
RUN find ./src -name "*.js" -delete

# Build TypeScript with verbose output
RUN npm run build:verbose

# Debug: Show directory structure and compiled files
RUN pwd && ls -la && echo "Contents of src:" && ls -la src && echo "Contents of dist:" && ls -la dist || true

# Verify compiled files
RUN test -f dist/server.js || (echo "Compilation failed: No server.js found" && exit 1)

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy compiled files
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Start command
CMD ["node", "dist/server.js"]