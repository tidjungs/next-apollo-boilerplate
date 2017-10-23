FROM node:7.7.2-alpine

RUN apk add --no-cache build-base

## cache node_modules
ADD ./package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app/src && cp -a /tmp/node_modules /app/

## copy meta
WORKDIR /app
ADD ./package.json /app/package.json

## build
WORKDIR /app
ADD \.next/ /app/.next
ADD \graphql-dummy-server/ /app/graphql-dummy-server
ADD ./.babelrc /app/.babelrc
ADD ./server.js /app/server.js
ADD ./routes.js /app/routes.js

## RETURN TO /app
WORKDIR /app

EXPOSE 3000
CMD ["npm", "run", "start:all"]
