FROM node:4.4.7

ENV APP_DIR=/opt/truyen

# NPM package cache
COPY package.json /tmp/package.json
RUN \
    cd /tmp && \
    npm install --production && \
    npm cache clean

# Application setup
RUN \
  mkdir ${APP_DIR} && \
  mkdir ${APP_DIR}/log && \
  cp -a /tmp/node_modules/ ${APP_DIR}

COPY client ${APP_DIR}/client
COPY common ${APP_DIR}/common
COPY server ${APP_DIR}/server
COPY package.json ${APP_DIR}/package.json

RUN chown -R www-data.www-data ${APP_DIR}

USER www-data

WORKDIR ${APP_DIR}

EXPOSE 3000
EXPOSE 8080

CMD ["npm", "start"]
