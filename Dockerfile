FROM node:17

# Create app directory
WORKDIR /usr/src/app

# create temp dir for dev 
RUN mkdir temp/

# Install nest js cli
RUN npm i -g @nestjs/cli

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install --save
RUN npm install --save-dev

# Install pm2 dependencies
RUN npm install pm2 -g

# Bundle app source
COPY . .

# Build app from ts to js
RUN npm run build

EXPOSE 3000
CMD [ "pm2-runtime", "dist/main.js" ]

