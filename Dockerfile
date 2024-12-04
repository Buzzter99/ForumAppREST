# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies, ensuring native modules are built for the container
RUN npm install

# Copy the application source code to the working directory
COPY . .

# Expose port 3000 to the host
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]
