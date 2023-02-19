FROM node:18.14-alpine 

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD [ "npm", "run", "start:dev" ]