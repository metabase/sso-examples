FROM node:lts-alpine as builder

WORKDIR /app

COPY server.js package.json /app/
COPY src /app/src
COPY public /app/public
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm install && npm run build

EXPOSE 8080

CMD [ "node", "server.js" ]
