### https://github.com/vercel/next.js/tree/canary/examples/with-docker

# Install dependencies only when needed
# FROM node:18-alpine AS DEPS
FROM node:18-alpine AS BUILD
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED 1

COPY ["package.json", "./"]
RUN ["yarn", "set", "version", "berry"]
RUN ["yarn"]

COPY . .

# RUN ["yarn", "set", "version", "berry"]
RUN ["yarn", "build"]

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

COPY --from=BUILD /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=BUILD --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=BUILD --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=BUILD /app/.next/standalone ./
COPY --from=BUILD /app/.next/static ./.next/static

# USER nextjs

EXPOSE 3000

ENV PORT 3000

RUN ["npm", "install", "-g", "tree-node-cli"]

RUN ["tree", "-a", "-I", "node_modules"]

CMD ["node", "server.js"]

# RUN ["yarn", "start"]