FROM node:21-alpine

WORKDIR /app
COPY . .

RUN npm i --save-dev
RUN npm run gen:types
RUN npm run build

ENV NODE_ENV=production

CMD ["npm", "run", "start:prod"]
EXPOSE 5000
