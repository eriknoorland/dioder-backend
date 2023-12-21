FROM node:14.17.0-alpine
WORKDIR /app
ADD package*.json /app
RUN npm install
COPY . /app
CMD ["npm", "start"]