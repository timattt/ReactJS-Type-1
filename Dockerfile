FROM node:latest
LABEL authors="timat"

WORKDIR /app

COPY . .

RUN npm install

ENTRYPOINT ["npm", "start", "--port", "3000"]