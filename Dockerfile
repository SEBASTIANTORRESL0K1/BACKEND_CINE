FROM node:20-alpine

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer puerto
EXPOSE 3005

# Comando por defecto
CMD ["npm","run","dev"]
