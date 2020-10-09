FROM node:14
WORKDIR /usr/src/app

COPY ./client/ ./
RUN next build

EXPOSE 3000
CMD ["next", "start"]