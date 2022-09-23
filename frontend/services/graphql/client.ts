import { createClient, dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { GraphCacheConfig, MeDocument } from "./generated/graphql";

export const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange<GraphCacheConfig>({
      updates: {
        Mutation: {
          logout: (_result, _args, cache, _info) => {
            cache.updateQuery({ query: MeDocument }, (data) => {
              if (data) {
                data.me = null;
              }
              return data;
            });
          },
        },
      },
    }),
    fetchExchange,
  ],
});
