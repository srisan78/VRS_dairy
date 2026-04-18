FROM node:20-alpine
WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm install --production

# Copy backend source code
COPY . .

EXPOSE 8000
# Update 'server.js' if your main file has a different name
CMD ["node", "server.js"]