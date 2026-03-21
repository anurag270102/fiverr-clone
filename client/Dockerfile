# Build stage
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .

RUN npm run build

# Production stage
FROM node:20

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/build ./build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]