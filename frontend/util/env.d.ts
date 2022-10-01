declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_URL_DEV: string;
      SERVER_URL_PROD: string;
    }
  }
}

export {}
