FROM node:20 AS Production

ENV NODE_ENV=production

WORKDIR /usr/app/Client
COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["sh", "-c", "npm start"]