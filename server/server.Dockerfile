FROM node:18.15-alpine

WORKDIR /app

COPY package*.json ./

COPY nodemon*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 8082

CMD [ "npm", "run", "start:dev" ]
