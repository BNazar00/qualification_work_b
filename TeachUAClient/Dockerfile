FROM node:16-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM nginx

COPY --from=build /app/build /etc/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
