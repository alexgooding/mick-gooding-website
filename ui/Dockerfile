# Stage 1: Create base image
FROM node:18-alpine as base

WORKDIR /app

COPY . .

# Stage 2: Create dev image
FROM base as dev 

RUN npm install

CMD ["npm", "start"]

# Stage 3: Create prod image
FROM base as build

RUN npm install --production

RUN npm run build

FROM nginx:alpine as prod

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
