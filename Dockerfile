FROM node:18 AS base
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build


FROM node:18-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production
COPY --from=base /usr/src/app/dist ./

CMD [ "node", "./index.js" ]