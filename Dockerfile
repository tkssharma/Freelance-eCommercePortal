# create a file named Dockerfile
FROM node:4-onbuild
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 2244
CMD ["npm", "start"]
