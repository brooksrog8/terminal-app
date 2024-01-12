FROM node:14 AS production

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /usr/app/server



COPY ./server/package.json .
COPY ./server/package-lock.json .


RUN npm install

COPY ./server/ .
EXPOSE 3000

CMD ["npm", "run", "dev"]