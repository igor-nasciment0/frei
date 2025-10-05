FROM node:22.0.0-alpine

WORKDIR /site
 
COPY . .
RUN npm install
RUN npm install pm2 -g
RUN npm install serve -g

RUN npm run build

CMD ["serve", "-s", "dist", "-l", "3000"]

EXPOSE 3000
