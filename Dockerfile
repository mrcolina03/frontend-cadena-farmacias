# Build stage
FROM node:18 AS build
WORKDIR /app

# Definir la variable de entorno para que apunte a la ruta del proxy Nginx.
ARG VITE_API_BASE_URL=/api/catalogo 
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY index.html ./
COPY public ./public

# Instala las dependencias. Usa --force o --legacy-peer-deps si hay problemas de versiones
RUN npm install
COPY . .

# Ejecutar el script de construcción (genera la carpeta 'dist')
RUN npm run build 

# Deploy with Nginx
FROM nginx:1.25

# Copiar la configuración de Nginx (con el proxy)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar la salida de la etapa de construcción (directorio 'dist' de Vite)
COPY --from=build /app/dist /usr/share/nginx/html 

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]