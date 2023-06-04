# - - Build image
FROM node:18-alpine AS BUILD_IMAGE

# Alpine package dependencies & emove cached files to reduce size
RUN apk update && apk add python3 make g++ && rm -rf /var/cache/apk/*

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --froze-lockfile

COPY . .

# Build application
RUN yarn build

# - - Run image
FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY --from=BUILD_IMAGE /app/build ./build
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules

EXPOSE 3000 
CMD ["node", "build/index.js"]

