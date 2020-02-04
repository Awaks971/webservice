FROM node:10.15.3

WORKDIR /server

COPY package*.json /server
RUN npm install

COPY . /server

CMD ["npm", "run", "dev"]