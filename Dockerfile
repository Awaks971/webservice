# Use the lightest version of NodeJS
FROM node:10

RUN mkdir -p /usr/src/app/awaks-webservices
# Specify working directory
WORKDIR /usr/src/app/awaks-webservices

# Copy only the package.json
COPY package*.json /usr/src/app/awaks-webservices/

# Install dependencies
RUN yarn

# If dependencies are installed, copy the rest of the project
COPY . /usr/src/app/awaks-webservices
# Expose app port
EXPOSE 4200

# Start the application
CMD ["yarn", "dev"]

