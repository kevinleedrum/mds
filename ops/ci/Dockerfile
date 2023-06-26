FROM node:16-slim as ci

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY packages/mds/package.json ./packages/mds/package.json
COPY packages/mds-react/package.json ./packages/mds-react/package.json

RUN yarn install

# Copy local code to the container image.
COPY . ./

FROM ci as build
RUN yarn build