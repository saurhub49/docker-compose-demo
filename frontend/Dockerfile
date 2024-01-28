# Stage 1: Build the Node.js application
FROM node:18-alpine as BUILD

# Set the working directory within the container to /app
WORKDIR /app

# Copy package.json to the container's working directory
COPY package.json .

# Install dependencies based on package.json
RUN npm install

# Copy all files from the current directory (.) to the container's working directory (/app)
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create a lightweight container for production
FROM node:18-alpine as PROD

# Set the working directory within the container to /app
WORKDIR /app

# Copy the build artifacts (dist folder) from the BUILD stage to the current stage
COPY --from=BUILD /app/dist/ /app/dist/

# Expose port 3000 to allow external connections to the application
EXPOSE 3000

# Copy package.json and vite.config.ts to the container's working directory
COPY package.json .
COPY vite.config.ts .

# Install TypeScript
RUN npm install typescript

# Specify the command to run when the container starts - run the application in preview mode
CMD [ "npm", "run", "preview" ]
