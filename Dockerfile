FROM node:23.7-slim AS modules

WORKDIR /app

COPY ./web /app


ENV HTTP_PROXY=${HTTP_PROXY}
ENV HTTPS_PROXY=${HTTPS_PROXY}

RUN npm install

FROM nginx:1.27.4-alpine-slim

COPY --from=modules /app/. /usr/share/nginx/html