# Use Node.js 23 as the base image for building the app
FROM node:23-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the Vite project
RUN npm run build

# Use Nginx as the base image for serving the built files
FROM nginx:alpine

# Copy the built files from the builder stage to the Nginx serving directory
COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to serve the app
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
