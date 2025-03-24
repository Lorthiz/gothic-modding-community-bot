FROM node:18-alpine
WORKDIR /usr/src/app
COPY dist /usr/src/app
CMD [ "node", "/usr/src/app/index.js" ]