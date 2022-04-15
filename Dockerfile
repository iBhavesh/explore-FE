FROM node:16-alpine3.14 AS BUILD_IMAGE
USER node
WORKDIR /app
COPY package.json yarn.lock* ./
RUN yarn install
FROM node:16-alpine3.14
WORKDIR /app
COPY --from=BUILD_IMAGE --chown=node:node /app/node_modules ./node_modules
EXPOSE 3000
CMD ["yarn", "start"]