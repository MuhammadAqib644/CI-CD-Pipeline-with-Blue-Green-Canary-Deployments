FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install --omit=dev

COPY server.js ./

ENV PORT=3000
EXPOSE 3000

USER node

CMD ["node", "server.js"]
