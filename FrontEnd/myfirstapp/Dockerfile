# pull official base image
FROM node:13.12.0-alpine AS build
# set working directory
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY --from=build package.json ./
COPY --from=build package-lock.json ./
RUN npm install
# add app
COPY --from=build . ./
# start app
CMD ["npm", "start"]