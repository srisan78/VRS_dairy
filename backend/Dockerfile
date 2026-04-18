FROM node:20-alpine
WORKDIR /app

# The * helps if there are hidden characters or case issues
COPY package*.json ./

# Verify the file is there before running npm install
RUN ls -l

# Use --omit=dev as recommended by the new npm version
RUN npm install --omit=dev

COPY . .

EXPOSE 8000
CMD ["node", "server.js"]