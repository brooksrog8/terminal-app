FROM node:20 AS development

ENV NODE_ENV=development

WORKDIR /usr/app/client
COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["sh", "-c", "npm start dev"]