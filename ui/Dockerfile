FROM node:18-alpine

WORKDIR /app

COPY ./public/ public
COPY ./src/ src
COPY ./package.json .
COPY ./.env.development .

RUN npm install

CMD ["npm", "start"]
