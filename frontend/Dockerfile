FROM node:20-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .

EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]