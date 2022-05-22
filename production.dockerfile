FROM node:lts-alpine

RUN yarn global add http-server @vue/cli-service

WORKDIR /app

COPY package*.json /

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8080

CMD [ "http-server", "dist" ]