FROM node:22

# Install netcat (needed by wait-for.sh)
RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /app

# Copy files
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7000

# Wait for MySQL to be ready, then start the app
CMD ["./wait-for.sh", "db:3306", "--", "node", "app.js"]