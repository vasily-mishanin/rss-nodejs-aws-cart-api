#ARG base_image=node:current-alpine3.19

# --- stage 1 ---
FROM node:current-alpine3.19 as builder

#ENV NODE_VERSION 18.19.0

# Set the working directory
WORKDIR /app

# Copy only the package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies (excluding typescript files), 
# ci = clean install - install deps exactly as in "package-lock.json"
# workaround if there is no such dep in the image
# RUN npm ci --production && npm install rimraf --save-dev &&
RUN npm i && npm i rimraf --save-dev


# Copy source files (excluding files generated by the application)
COPY . .

# Build the Nest.js application
RUN npm run build

# --- stage 2 ---
# -----> Start a NEW stage with a smaller base image
FROM node:current-alpine3.19
# Set the working directory
WORKDIR /app
# Copy only the necessary files from the previous stage
#COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

ENV DATABASE_HOST=rds-cart-database.cxrsba5xkeln.us-east-1.rds.amazonaws.com
ENV DATABASE_PORT=5432
ENV DATABASE_USERNAME=student
ENV DATABASE_PASSWORD=AZberserker!934
ENV DATABASE_NAME=cart_database_rss


ENV PORT=8080
# Expose the port the app runs on
EXPOSE 8080

# Command to run app
# CMD ["npm", "run", "start:prod"]
CMD ["node", "dist/main.js"]