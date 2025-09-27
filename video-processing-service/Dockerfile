# Stage 1: Build the app
FROM node:18-alpine AS builder

# Install ffmpeg in builder - optional if you run only compiled JS in final stage
RUN apk add --no-cache ffmpeg

WORKDIR /app

# Copy package files to leverage docker cache for npm installs
COPY package.json package-lock.json ./

RUN npm install

# Copy source code
COPY . .

# Build TypeScript to JavaScript (assumes "build": "tsc" in package.json scripts)
RUN npm run build

# Stage 2: Create final lightweight image
FROM node:18-alpine

# Install ffmpeg since it's needed at runtime for video processing
RUN apk add --no-cache ffmpeg

WORKDIR /app

# Copy only production dependencies from builder stage
COPY package.json package-lock.json ./
RUN npm install --production

# Copy built files from builder stage (assuming output to /app/dist)
COPY --from=builder /app/dist ./dist

# If you have other assets to copy (e.g., config files, .env), copy them here
# COPY --from=builder /app/some-config ./some-config

EXPOSE 3000

# Start your service from the compiled JS code
CMD ["node", "dist/index.js"]
