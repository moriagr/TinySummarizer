# ✅ 1) Use an official Node image (choose an LTS version)
FROM node:20

# ✅ 2) Create & set the working directory inside the container
WORKDIR /app

# ✅ 3) Copy package.json and package-lock.json first — this allows Docker to cache dependencies
COPY package*.json ./

# ✅ 4) Install dependencies
RUN npm install --production

# ✅ 5) Copy the rest of the application code
COPY . .

# ✅ 6) Expose the port the app listens on
EXPOSE 8080

# ✅ 7) Define the default command
CMD ["npm", "start"]
