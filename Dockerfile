FROM node:18
WORKDIR /usr/src/app
COPY package*.json app.js ./
RUN npm ci
EXPOSE 2002
CMD ["node", "app.js"]