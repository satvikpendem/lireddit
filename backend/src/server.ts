import { ApolloServer } from "apollo-server-express";
import express from "express";
import Redis from "ioredis";

import { schema } from "./schema";
import session from "./session";
import { PROD } from "./constants";
import { Context } from "./types";

export async function startServer() {
  const app = express();

  app.set("trust proxy", 1);
  app.use(session);

  // https://blog.devgenius.io/graphql-apollo-studio-and-cookies-5d8519d0ca7e
  // This is a workaround for Apollo Studio to work with cookies.
  !PROD && app.set("trust proxy", 1);

  const redis = new Redis(process.env.REDIS_URL ?? "redis://localhost:6379");

  const server = new ApolloServer({
    schema,
    introspection: !PROD,
    csrfPrevention: PROD,
    context: ({ req, res }): Context => ({ req, res, redis }),
  });
  await server.start();

  server.applyMiddleware({
    app,
    // https://blog.devgenius.io/graphql-apollo-studio-and-cookies-5d8519d0ca7e
    // Add CORS here to allow Apollo Studio to work with cookies.
    cors: {
      origin: [
        // process.env.WEB_URL,
        // "https://studio.apollographql.com",
        // "http://localhost:3000",
        "*",
      ],
      credentials: true,
    },
  });

  app.listen(4000, () => {
    console.log("Server started on localhost:4000");
  });
}
