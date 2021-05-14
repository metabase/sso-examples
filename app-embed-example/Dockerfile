FROM node:lts-alpine3.13 as builder

WORKDIR /app

COPY server.js package.json yarn.lock /app/
COPY src /app/src
COPY public /app/public
RUN yarn && yarn build

CMD [ "node", "server.js" ]
