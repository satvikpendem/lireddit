import { createClient, dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import {
  GraphCacheConfig,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "./generated/graphql";
import { updateQuery } from "../../util/updateQuery";

console.log("process.env", process.env);

console.log("process.env.SERVER_URL", process.env.SERVER_URL);

export const client = createClient({
  url: process.env.SERVER_URL,
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange<GraphCacheConfig>({
      updates: {
        Mutation: {
          login(parent, args, cache, info) {
            updateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              parent,
              (result, query) => {
                if (result.login?.__typename === "MutationLoginSuccess") {
                  return {
                    me: result.login.data,
                  };
                }
                return query;
              },
            );
          },
          register(parent, args, cache, info) {
            updateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              parent,
              (result, query) => {
                if (result.register?.__typename === "MutationRegisterSuccess") {
                  return {
                    me: result.register.data,
                  };
                }
                return query;
              },
            );
          },
          logout(parent, args, cache, info) {
            updateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              parent,
              () => ({ me: null }),
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
});
