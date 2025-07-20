# Step 1: Use official Node.js base image
FROM node:18

# Echo message after base image is set
RUN echo "Dockerfile started building..."

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy all project files
COPY . .

# Step 6: Expose the port your app runs on
EXPOSE 3000

# Step 7: Start the app
CMD ["node", "app.js"]
