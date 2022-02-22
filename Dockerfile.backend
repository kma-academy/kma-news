FROM node:16-slim as base

ARG BUILD_TARGET=backend

ENV TZ=Asia/Ho_Chi_Minh

WORKDIR /home/node/app

COPY package*.json .

RUN npm i

COPY "dist/apps/${BUILD_TARGET}/main.js" /home/node/app/main.js

CMD [ "node", "main.js" ]
