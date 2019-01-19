FROM node:10

WORKDIR /tableItReviews

RUN npm install

COPY . .

EXPOSE 9001

CMD ["npm", "start"]
