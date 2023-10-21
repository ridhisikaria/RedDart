FROM node:18
WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npm run build
EXPOSE 2002
CMD ["node", "build/app.js"]