FROM node:22

WORKDIR /app

COPY package*.json ./

# install dependencies INSIDE container
RUN npm install --force

COPY . .

EXPOSE 8000

CMD ["npm", "run", "start"]