FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only package files first to take advantage of Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the app
RUN npm run build

# Expose port that Vite preview will run on
EXPOSE 3000

# Start Vite preview server
CMD ["npm", "run", "preview", "--", "--port=3000", "--host"]
