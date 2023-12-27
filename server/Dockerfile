FROM node:20 AS Production

ENV NODE_ENV=production

WORKDIR /usr/app/server
COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .


CMD ["sh", "-c", "npm run dev"]