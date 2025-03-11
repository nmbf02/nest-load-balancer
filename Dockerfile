# Usar una imagen base oficial de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de la aplicación
COPY package.json package-lock.json ./
RUN npm install

# Copiar el código fuente
COPY . .

# Compilar la aplicación (si es necesario)
RUN npm run build

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando de inicio
CMD ["npm", "run", "start"]