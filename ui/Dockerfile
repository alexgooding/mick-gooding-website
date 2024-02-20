# Stage 1: Create base image
FROM node:18-alpine as base

WORKDIR /app

COPY . .

# Stage 2: Create dev image
FROM base as dev 

RUN npm install

CMD ["npm", "start"]

# Stage 3: Create prod image
FROM base as prod

RUN npm install --production
RUN npm install -g serve
RUN npm run build

CMD ["serve", "-s", "build"]
