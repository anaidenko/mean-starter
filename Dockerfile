FROM node:10.15.3-alpine

# load production/development mode
ARG mode

RUN apk update && apk upgrade && \
  apk add --no-cache bash git openssh
RUN apk add --no-cache --virtual .gyp \
  python \
  make \
  g++ \
  curl
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .

# fix docker pipeline "uid/gid" error caused by m5
RUN npm config set unsafe-perm true

RUN npm config set registry https://registry.npmjs.org/
RUN npm install
RUN npm install pm2 -g

RUN apk del .gyp

EXPOSE 3000
CMD [ "pm2-runtime", "process.yml" ]
