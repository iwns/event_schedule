FROM node:18.17.1
WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

