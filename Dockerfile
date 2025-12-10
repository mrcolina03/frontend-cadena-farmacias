# --- STAGE 1: Build Stage ---
# Usamos una imagen base Node.js para la compilación
FROM node:20-alpine as builder

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración y dependencias
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./

# Instala las dependencias. Usa --force o --legacy-peer-deps si hay problemas de versiones
RUN npm install

# Copia el código fuente
COPY src ./src

# Compila la aplicación para producción
# Asegúrate de que tu build command sea el correcto (e.g. npm run build)
RUN npm run build

# --- STAGE 2: Production Stage ---
# Usamos una imagen base Nginx ligera para servir los archivos estáticos
FROM nginx:alpine as production

# Copia los artefactos de la compilación de la etapa 'builder'
# El directorio 'dist' es el output por defecto de Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Elimina el archivo de configuración por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Crea un archivo de configuración minimalista para Nginx
COPY nginx.conf /etc/nginx/conf.d/mi-farmacia.conf

# El contenedor expone el puerto 80 (por defecto de Nginx)
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]