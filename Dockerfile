FROM mhart/alpine-node:16

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install app dependencies
COPY package.json /usr/src/app/
RUN yarn install

# bundle app source
COPY . /usr/src/app

EXPOSE 3000

CMD ["yarn", "start"]
