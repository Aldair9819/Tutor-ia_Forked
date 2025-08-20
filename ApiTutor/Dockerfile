# Backend Dockerfile
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

EXPOSE 3001
CMD ["npm", "start"]
