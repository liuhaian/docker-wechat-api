FROM docker.io/node:slim

#install plugin
RUN mkdir -p /usr/src/myapp/host && cd /usr/src/myapp && npm install express mongoose body-parser cookie-parser express-session basic-auth jade morgan debug static-favicon request express-xml-bodyparser wechat-crypto wechat-api

WORKDIR /usr/src/myapp

COPY app.js ./

ENTRYPOINT ['node', 'app']