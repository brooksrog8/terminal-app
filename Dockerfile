FROM node:14 AS production


WORKDIR /usr/app/server



COPY ./server/package.json .
COPY ./server/package-lock.json .


RUN npm install

COPY ./server/ .
EXPOSE 3000

CMD ["npm", "run", "dev"]
