#
# Image for running test suite.
#
FROM node:8.9-alpine

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY services/web/package.json /home/node/app
RUN npm install

EXPOSE 3000
