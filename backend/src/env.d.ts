declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      FORGOT_PASSWORD_PREFIX: string;
      WEB_URL: string;
      REDIS_URL: string;
      SESSION_PASSWORD: string;
      NODE_ENV: "development" | "production";
    }
  }
}

export {}
