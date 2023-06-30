FROM node:16-alpine as ci

RUN apk --no-cache add ca-certificates

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY packages/mds/package.json ./packages/mds/package.json
COPY packages/mds-react/package.json ./packages/mds-react/package.json

RUN yarn install

# Copy local code to the container image.
COPY . ./

FROM ci as build
ARG GITHUB_USERNAME
ARG GITHUB_EMAIL
ARG GITHUB_TOKEN

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

RUN git config --global user.name ${GITHUB_USERNAME}
RUN git config --global user.email ${GITHUB_EMAIL}
RUN git remote set-url origin https://git:${GITHUB_TOKEN}@github.com/moxiworks/mds.git

RUN yarn build