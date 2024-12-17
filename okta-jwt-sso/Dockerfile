FROM node:lts-alpine as builder

WORKDIR /app

COPY server.js package.json /app/
COPY src /app/src
COPY public /app/public
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm install

EXPOSE 3001

CMD [ "npm", "start" ]
