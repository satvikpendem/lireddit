export const PROD = process.env.NODE_ENV === "production";
export const GRAPHQL_URL = PROD
  ? "https://api.lireddit.pantheonlabs.io/graphql"
  : "http://localhost:4000/graphql";
