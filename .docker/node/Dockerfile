FROM node:23-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

FROM node:23-alpine as production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app .

CMD ["npm", "run", "start:prod"]