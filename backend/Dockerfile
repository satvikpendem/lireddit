FROM node:slim as BUILD
WORKDIR /usr/src/app
COPY ["package.json", ".swcrc", "./"]
RUN ["yarn", "set", "version", "berry"]
RUN ["yarn", "plugin", "import", "https://gitlab.com/Larry1123/yarn-contrib/-/raw/master/packages/plugin-production-install/bundles/@yarnpkg/plugin-production-install.js"]
COPY [".", "."]
RUN ["yarn", "pnpify", "prisma", "generate"]
RUN ["yarn", "prod-install", "--production", "dist"]
RUN ["yarn", "swc", "src", "-d", "dist"]
COPY [".env", "./dist/"]
RUN ["cp", "-r", "src/prisma", "dist/prisma"]
RUN ["cp", "src/generated/prisma-client/schema.prisma", "src/generated/prisma-client/libquery_engine-debian-openssl-3.0.x.so.node", "src/generated/prisma-client/package.json", "dist/generated/prisma-client"]

FROM node:alpine
WORKDIR /usr/src/app
COPY --from=BUILD ["usr/src/app/dist", "./"]
ENTRYPOINT ["yarn", "prod:dist"]
EXPOSE 8080

### Shell script form for BUILD
# yarn pnpify prisma generate
# yarn prod-install --production dist
# yarn swc src -d dist
# cp .env dist/.env
# cp -r src/prisma dist
# cp src/generated/prisma-client/schema.prisma src/generated/prisma-client/libquery_engine-debian-openssl-3.0.x.so.node src/generated/prisma-client/package.json dist/generated/prisma-client 
# cd dist
# yarn prod:dist