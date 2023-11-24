#version de imagen
FROM node 
#llamado dentro del contenedor
WORKDIR /index


#copia todo los Archivos 
COPY . .

RUN npm install
#PUERTO por donde se puede ejecutar 
EXPOSE 4000

#terminal COMANDOS
CMD [ "npm","start" ]