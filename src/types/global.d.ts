declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string | undefined;
      PORT: string | undefined;
      LOGGERS: string | undefined;
      POSTGRES_URL: string | undefined;
      JWT_SECRET_KEY: string | undefined;
      JWT_VALIDATE: string | undefined;
    }
  }
}

export {};
