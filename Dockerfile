FROM node:23-slim

WORKDIR /app

COPY client /app/client
COPY server /app/server

RUN cd client && \
    npm install && \
    npm run build

RUN cd server && \
    npm install &&
    apt-get update && apt-get install curl

CMD "cd server && npm start"