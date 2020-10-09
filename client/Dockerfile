FROM node:14
WORKDIR /usr/src/app

COPY ./client/package.json ./
RUN npm install --production --loglevel warn

COPY ./client/ ./
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]