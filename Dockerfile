FROM node:10.10.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install pm2 -g

COPY . .

EXPOSE 9001

CMD ["pm2-runtime","start","process.yml"]
