FROM common-core-image:latest as app
WORKDIR /home/node/app

COPY package*.json ./
COPY tsconfig.json ./
COPY ./src ./src

RUN npm install
RUN npm run build

WORKDIR /home/node/app

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
