FROM node:18 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY src tsconfig.json ./
RUN npm run build


FROM node:18-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production
COPY --from=build /usr/src/app/dist ./

CMD [ "node", "./index.js" ]