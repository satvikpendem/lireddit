# FROM node:latest

# WORKDIR /usr/src/app

# COPY package.json ./
# COPY yarn.lock ./

# RUN yarn install

# COPY . .

# EXPOSE 4000

# CMD [ "npm", "start" ]

FROM node:latest as builder
WORKDIR /usr/src/app
COPY ["package.json", ".env", ".swcrc", "./"]
RUN ["yarn", "set", "version", "berry"]
RUN ["yarn", "plugin", "import", "https://gitlab.com/Larry1123/yarn-contrib/-/raw/master/packages/plugin-production-install/bundles/@yarnpkg/plugin-production-install.js"]
RUN ["yarn", "prod-install", "--production", "dist"]
COPY ["src", "./src"]
COPY ["prisma", "./prisma"]
RUN ["yarn", "swc", "src", "-d", "dist"]
RUN ["yarn", "pnpify", "prisma", "generate"]
RUN ls -la
# RUN echo $(ls -1 ./)
# RUN ["node", "dist/index.js"]
# RUN ["/bin/bash", "-c", "find . ! -name dist ! -name node_modules -maxdepth 1 -mindepth 1 -exec rm -rf {} \\;"]

FROM node:alpine
# LABEL org.opencontainers.image.vendor=demo-frontend
# LABEL org.opencontainers.image.title="Buddy Team"
WORKDIR /usr/src/app
# COPY --from=builder ["root/.pnp.cjs", "root/.pnp.loader.mjs", "/root/.env", "", "./"]
# COPY --from=builder ["root/prisma", "./prisma"]
# COPY --from=builder ["root/.yarn", "./.yarn"]
# COPY --from=builder ["root/generated", "./generated"]
# COPY --from=builder ["root/dist", "./dist"]
COPY --from=builder ["usr/src/app", "./"]
RUN ["rm", "-rf", "src"]
RUN ls -la
# ENTRYPOINT ["yarn", "prod"]
# ENTRYPOINT ["node", "dist/index.js"]
EXPOSE 8080