FROM node:18-alpine as ci

RUN apk --no-cache add ca-certificates

WORKDIR /app

COPY .npmrc ./
COPY .yarn/releases ./.yarn/releases
COPY .yarnrc.yml ./

COPY package.json ./
COPY packages/mds-react/package.json ./packages/mds-react/package.json
COPY packages/mds-angular/package.json ./packages/mds-angular/package.json
COPY packages/mds-vue/package.json ./packages/mds-vue/package.json
COPY packages/mds/package.json ./packages/mds/package.json

COPY yarn.lock ./

RUN yarn install --immutable

# Copy local code to the container image.
COPY . ./

FROM ci as build
ARG GITHUB_USERNAME
ARG GITHUB_EMAIL
ARG GITHUB_TOKEN
ARG BUILDKITE_BRANCH
ARG BUILDKITE_COMMIT

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

# This is used by the activepipebot
RUN git config --global user.name ${GITHUB_USERNAME}
RUN git config --global user.email ${GITHUB_EMAIL}
# We also want to set the origin and checkout the main branch as we don't want a detached head
RUN git remote set-url origin https://git:${GITHUB_TOKEN}@github.com/moxiworks/mds.git
RUN git checkout -B ${BUILDKITE_BRANCH} ${BUILDKITE_COMMIT}

# Clear the token as we only wanted it for the remote
ARG GITHUB_TOKEN=""

RUN yarn build