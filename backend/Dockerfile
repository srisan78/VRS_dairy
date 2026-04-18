# Use Node.js, not Python!
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install dependencies
# This looks for your package.json file
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Your docker-compose says the backend uses port 8000
EXPOSE 8000

# This starts your Node server
CMD ["node", "index.js"]