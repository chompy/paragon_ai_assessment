FROM node:23-slim

WORKDIR /app

COPY client /app/client
COPY server /app/server

RUN apt-get update && apt-get -y install curl && \
    cd client && \
    npm install && \
    npm run build && \
    cd ../server && \
    npm install
    

CMD ["sh", "-c", "cd server && npm start"]