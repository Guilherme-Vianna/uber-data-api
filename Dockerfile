# Step 1: Build Stage (using Node 18 for building the app)
FROM node:18-alpine AS build

WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (to take advantage of Docker cache)
COPY package*.json ./

# Install dependencies (including devDependencies)
RUN npm install

# Copy the rest of the application files
COPY . .


# Generate Prisma Client (this step generates Prisma client after migrations)
RUN npx prisma generate

# Build the application (assuming `npm run build` generates output in `dist/`)
RUN npm run build

# Step 3: Production Stage (using a smaller image for runtime)
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/prisma ./prisma

# Install only production dependencies (skip devDependencies)
RUN npm install --production

# Expose the port that the app will listen on
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "start:prod"]
