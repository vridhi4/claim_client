# Use an official Node.js runtime as the base image
FROM node:18-alpine
 
# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json files
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of the application files to the working directory
COPY . .
 
# Build the React app
# RUN npm run build
 
# Expose the port on which your React app will run (typically 3000)
EXPOSE 3000
 
# Define the command to start your React app
CMD ["npm", "start"]
 