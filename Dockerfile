FROM node:20-alpine

WORKDIR /app
COPY . .

RUN npm i --save-dev
RUN npm run schema:generate
RUN npm run build

ENV NODE_ENV=production

CMD ["npm", "run", "start"]
EXPOSE 5000
