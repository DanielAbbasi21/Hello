# Use the official Node.js image from the Docker Hub
FROM node:latest

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Change to an ordinary user
USER node

# Start the server
CMD ["npm", "start"]
