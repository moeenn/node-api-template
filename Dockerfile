FROM node:16-alpine

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

ENV NODE_ENV=production

CMD ["npm", "run", "start"]
EXPOSE 5000