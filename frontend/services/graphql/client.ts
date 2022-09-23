import { createClient, dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";

export const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange({}),
    fetchExchange,
  ],
  requestPolicy: "cache-and-network",
});
