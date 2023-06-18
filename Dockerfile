FROM node:18-alpine as static
WORKDIR /app
COPY . /app
COPY example.env /app/.env

RUN apk add --no-cache \
  autoconf \
  automake \
  g++ \
  libc6-compat \
  libjpeg-turbo-dev \
  libpng-dev \
  make \
  nasm \
  git

RUN apk update && \
  npm i && \
  npm run build

FROM nginx:1.22.0-alpine as nginx
RUN apk add --no-cache \
  bash
WORKDIR /srv/www
COPY --from=static /app/public /usr/share/nginx/html
COPY nginx.conf     /etc/nginx/nginx.conf
RUN chmod -R +rwX /var/log/nginx /var/cache/nginx/ /var/run/ /usr/share/nginx/html/ && chmod -R +rX /etc/nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
