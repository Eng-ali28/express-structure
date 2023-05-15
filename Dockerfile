ARG NODE_VERSION=18.16.0

FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /usr/src/app

RUN npm install -g nodemon

COPY package*.json .


FROM base as development

RUN npm i

COPY . .

EXPOSE 4000

CMD [ "npm" , "run" , "dev" ]
