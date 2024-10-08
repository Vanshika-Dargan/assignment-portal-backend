FROM node:20-alpine
WORKDIR /server
COPY package*.json .
RUN npm install
CMD ["npm", "run", "dev"]
