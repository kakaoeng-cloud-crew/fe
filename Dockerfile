# Dockerfile.prod
FROM node:18-alpine AS build

WORKDIR /app

# 종속성 패키지 설치
COPY ./package*.json .
RUN npm install

# 빌드하기
COPY . .
RUN npm run build

# 빌드 결과물 불러와서 nginx에 올리기
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
