FROM node:20-alpine AS build
WORKDIR /app

# Instala dependências do sistema necessárias para builds e git
RUN apk add --no-cache git python3 make g++

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Etapa 2: Nginx servindo os arquivos
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
    