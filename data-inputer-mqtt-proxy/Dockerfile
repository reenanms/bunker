FROM node:21 as base
WORKDIR /home/node/app

COPY package*.json ./
COPY tsconfig.json ./
COPY ./src ./src

RUN npm install
RUN npm run build

WORKDIR /home/node/app/dist
CMD ["node","main.js"]

