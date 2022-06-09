FROM node:lts-alpine as builder

WORKDIR /app

COPY server.js package.json package-lock.json /app/
COPY src /app/src
COPY public /app/public
RUN npm ci && npm run build

EXPOSE 8080

CMD [ "node", "server.js" ]
