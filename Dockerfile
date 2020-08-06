# pull official base image
FROM node:6.11-stretch

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY . ./
# COPY yarn.lock ./
RUN npm install -g yarn
RUN yarn install

# add app
# COPY . ./

# start app
CMD ["npm", "run", "serve"]
