FROM node:7.7.2-alpine

RUN apk add --no-cache build-base

## cache node_modules
ADD ./package.json /tmp/package.json
RUN cd /tmp && NODE_ENV=production npm install
RUN mkdir -p /app/src && cp -a /tmp/node_modules /app/

## copy meta
WORKDIR /app
ADD ./package.json /app/package.json

## build
WORKDIR /app
ADD \.next/ /app/.next
ADD ./server.js /app/server.js
ADD ./routes.js /app/routes.js
## Clean and lean
RUN npm i -g modclean && modclean -r -D ./node_modules && npm r -g modclean

## RETURN TO /app
WORKDIR /app

EXPOSE 3000
CMD ["npm", "start"]
