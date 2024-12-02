FROM node:20-alpine

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

COPY . .

COPY scripts/start.sh /app/start.sh
RUN chmod +x /app/start.sh

EXPOSE 3000
CMD ["sh", "/app/start.sh"]