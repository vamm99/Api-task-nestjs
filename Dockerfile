# Establece la imagen base con Node.js LTS
FROM node:18-alpine AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo de dependencias y las instala
COPY package*.json ./
RUN npm install --only=production

# Copia el resto de los archivos del proyecto
COPY . .

# Compila la aplicación (suponiendo que uses TypeScript)
RUN npm run build

# Imagen final para ejecutar la aplicación
FROM node:18-alpine

WORKDIR /app

# Copia las dependencias y el código compilado desde la etapa anterior
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Configura el comando por defecto para ejecutar la aplicación
CMD ["node", "run", "start:prod"]
