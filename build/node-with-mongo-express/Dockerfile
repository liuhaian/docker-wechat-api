FROM docker.io/node:slim

MAINTAINER <gzlock> gzlock88@gmail.com

RUN cd / \
    && apt-get update \
    && apt-get install -y git \
    && git clone https://github.com/andzdroid/mongo-express.git \
    && apt-get purge --auto-remove -y git

WORKDIR /mongo-express

ENV WEB_PATH="/mongo-express"
ENV WEB_USER="user"
ENV WEB_PASS="pass"
ENV ADMIN_USER=""
ENV ADMIN_PASS=""
ENV MONGO_PORT="27017"
ENV EDITOR_THEME="default"

COPY docker-entrypoint.sh ./

RUN chmod +x ./docker-entrypoint.sh && ./docker-entrypoint.sh

RUN npm install

EXPOSE 8081

ENTRYPOINT ['node', 'app']