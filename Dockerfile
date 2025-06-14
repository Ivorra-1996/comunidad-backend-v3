# Development stage
FROM node:18 as development
WORKDIR /comunidad-backend-v3

# Copia el archivo package.json
COPY package*.json ./
RUN npm install

# Copia la carpeta de código fuente
COPY ./dist ./dist
COPY ./database ./database
COPY ./files ./files
COPY .sequelizerc .sequelizerc
COPY .babelrc .babelrc

# Define el comando para iniciar la aplicación en modo desarrollo
CMD [ "npm", "run", "start" ]
