FROM node:10.10.0

WORKDIR /tableItReviews

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9001

CMD ["npm", "start"]
