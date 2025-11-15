# Node.js + Next.js + Prisma Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* yarn.lock* ./
RUN npm install --production=false

COPY . .

# Ensure uploads and db folders exist
RUN mkdir -p uploads prisma/prisma

# Expose port (change if needed)
EXPOSE 3000


# Generate Prisma client
RUN npx prisma generate

# Build Next.js production assets
RUN npm run build

# Start the app
CMD ["npm", "run", "start"]
