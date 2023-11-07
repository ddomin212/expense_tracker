# Use a Node.js base image with a specific version
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY . .

# Expose the port the app will listen on
EXPOSE 4000

# Set the command to start the app
CMD ["npm", "start"]
