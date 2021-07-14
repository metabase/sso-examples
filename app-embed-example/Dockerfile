FROM node:lts-alpine3.13 as builder

WORKDIR /app

COPY server.js package.json package-lock.json /app/
COPY src /app/src
COPY public /app/public
RUN npm ci && npm run build

CMD [ "node", "server.js" ]
