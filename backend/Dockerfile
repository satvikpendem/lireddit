FROM node:slim as BUILD
WORKDIR /usr/src/app
COPY ["package.json", ".swcrc", "./"]
RUN ["yarn", "set", "version", "berry"]
RUN ["yarn", "plugin", "import", "https://gitlab.com/Larry1123/yarn-contrib/-/raw/master/packages/plugin-production-install/bundles/@yarnpkg/plugin-production-install.js"]
COPY [".", "."]
RUN ["yarn"]
RUN ["yarn", "db:generate"]
RUN ["yarn", "prod-install", "--production", "dist"]
RUN ["yarn", "swc", "src", "-d", "dist"]
RUN ["cp", "-r", "src/generated", "dist/generated"]
RUN ["yarn", "swc", "dist", "-d", "dist"]
RUN ["cp", "-r", "src/prisma", "dist/prisma"]
RUN ["cp", "package.json.prod", "dist/package.json"]

FROM node:slim
WORKDIR /usr/src/app
ENV NODE_ENV production
ENV DATABASE_URL "postgresql://cl8p25oe80006cuo92a1o1hc5:VJ94dsoCEleiEs4rnDUvTI6g@147.182.213.82:9001/cl8p25oea0008cuo99o5faqjl"
ENV REDIS_URL "redis://:MzRw9CrFpMm7bubV0ap2UIh5@147.182.213.82:9000/"

COPY --from=BUILD ["usr/src/app/dist", "./"]
RUN ["yarn", "dlx", "prisma", "migrate", "deploy"]
ENTRYPOINT ["yarn", "prod"]
EXPOSE 8080

### Shell script form for BUILD
# yarn pnpify prisma generate
# yarn prod-install --production dist
# yarn swc src -d dist
# cp .env dist/.env
# cp -r src/prisma dist
# cp src/generated/prisma-client/schema.prisma src/generated/prisma-client/*.node src/generated/prisma-client/package.json dist/generated/prisma-client 
# cd dist
# yarn prod