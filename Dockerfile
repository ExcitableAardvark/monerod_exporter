FROM node:8

WORKDIR /srv

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 8080

CMD ["node", "index.js"]

