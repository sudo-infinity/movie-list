# Use the official Node.js image as a parent image
FROM node:20.16.0
# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npx prisma generate 

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run the app
CMD ["npm", "run", "start"]
