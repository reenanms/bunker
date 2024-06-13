FROM node:21 as app

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL $REACT_APP_BACKEND_URL

WORKDIR /home/node/app

COPY package*.json ./
COPY ./public ./public
COPY ./src ./src

RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
