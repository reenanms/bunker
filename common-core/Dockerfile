FROM node:21 as base

WORKDIR /home/node/common-core

COPY package*.json ./
COPY tsconfig.json ./
COPY ./src ./src

RUN npm install
RUN npm run nosql-generate
RUN npm run sql-generate
RUN npm run build

# Workarround til they fix the bug in cpy-cli:5.0.0
# RUN npm run post-build
WORKDIR /home/node/common-core/src
RUN npx cpy ./**/prisma/**/* ../dist
WORKDIR /home/node/common-core
# Workarround end

CMD ["echo", "common-core image created!"]
