export const PROD = process.env.NODE_ENV === "production";

export const WEB_URL = PROD
  ? "https://app.lireddit.pantheonlabs.io"
  : "http://localhost:3000";
export const SESSION_PASSWORD = PROD
  ? "fjFcWDQEkSPgxcvFMWmuXSjrjyjkkqyDCkJQcKkDNJYaXSuqZv"
  : "password";
export const FORGOT_PASSWORD_PREFIX = PROD
  ? "kdahlmnleht4iu4ijslkh"
  : "forgot-password:";

export const APOLLO_STUDIO_URL = "https://studio.apollographql.com";
export const COOKIE_NAME = "qid";
