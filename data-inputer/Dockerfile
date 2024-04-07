FROM node:21 as base
WORKDIR /home/node/app

COPY package*.json ./
COPY tsconfig.json ./
COPY ./src ./src

RUN npm install
RUN npm run nosql-generate
RUN npm run sql-generate
RUN npm run build

WORKDIR /home/node/app/src

RUN npx cpy **/prisma/client/**.js ../dist
RUN npx cpy **/prisma/client/**/*.js ../dist

RUN npx cpy **/prisma/client/**.prisma ../dist
RUN npx cpy **/prisma/client/**/*.prisma ../dist

WORKDIR /home/node/app/dist
CMD ["node","index.js"]

