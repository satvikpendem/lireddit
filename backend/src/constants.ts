export const PROD = process.env.NODE_ENV === "production";

export const WEB_URL = PROD
  ? "https://app.lireddit.pantheonlabs.io"
  : "http://localhost:3000";
export const DATABASE_URL = PROD
  ? "postgresql://cl8p25oe80006cuo92a1o1hc5:VJ94dsoCEleiEs4rnDUvTI6g@147.182.213.82:9001/cl8p25oea0008cuo99o5faqjl"
  : "postgres://api_user:postgres@localhost:5432/lireddit";
export const REDIS_URL = PROD
  ? "redis://:MzRw9CrFpMm7bubV0ap2UIh5@147.182.213.82:9000/"
  : "redis://localhost:6379";
export const SESSION_PASSWORD = PROD
  ? "fjFcWDQEkSPgxcvFMWmuXSjrjyjkkqyDCkJQcKkDNJYaXSuqZv"
  : "password";
export const FORGOT_PASSWORD_PREFIX = "forgot-password:";

export const APOLLO_STUDIO_URL = "https://studio.apollographql.com";
export const COOKIE_NAME = "qid";
