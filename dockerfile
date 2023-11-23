FROM node 

WORKDIR /index



COPY . .

RUN npm install

EXPOSE 4000


CMD [ "npm","start" ]