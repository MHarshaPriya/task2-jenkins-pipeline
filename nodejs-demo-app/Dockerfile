# Use Node.js official image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of app
COPY . .

# Expose app port
EXPOSE 3000

# Start app
CMD ["npm", "start"]
