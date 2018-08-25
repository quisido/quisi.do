FROM node:alpine AS builder
WORKDIR /var/www
ENV REACT_APP_NPM_DOWNLOADS_API https://api.charlesstover.com/npm/downloads
COPY package.json yarn.lock ./
RUN yarn install
COPY public public
COPY src src
RUN yarn build

FROM nginx:alpine
LABEL Author="Charles Stover"
RUN rm -rf /etc/nginx/conf.d
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /var/www/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
