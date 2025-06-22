# ✅ 1) Build stage — use Node to build static files
FROM node:20 
# AS build

# Set working directory
WORKDIR /app

# Copy dependencies files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

EXPOSE 3000

# Build the app
CMD ["npm", "run", "dev"]

# # ✅ 2) Production stage — serve static files with nginx
# FROM nginx:alpine

# # Remove default nginx static files
# RUN rm -rf /usr/share/nginx/html/*

# # Copy build output from previous stage to nginx public folder
# COPY --from=build /app/build /usr/share/nginx/html

# # Copy custom nginx config if needed (optional)
# # COPY nginx.conf /etc/nginx/nginx.conf

# # Expose port 80
# EXPOSE 80

# # Start nginx (default CMD works)
