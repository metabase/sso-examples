FROM node as builder

WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn

COPY src /app/src
COPY public /app/public

RUN yarn build

COPY server.js /app/

CMD [ "node", "server.js" ]
