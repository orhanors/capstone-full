#Production dockerfile
#Two step, 1-build 2-run with nginx
FROM node:15-alpine
USER node
RUN mkdir -p /home/node/app

WORKDIR /home/node/app


COPY --chown=node:node ./package*.json ./

RUN npm i

COPY --chown=node:node . . 

RUN npm run build

FROM nginx
EXPOSE 3000
#We're overriding default nginx configurations with our configuration
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
#W're copying all the production assets from building (previous) phase
COPY --from=0 /app/build /usr/share/nginx/html