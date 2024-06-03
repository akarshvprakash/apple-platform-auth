// types/env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      // Add other environment variables as needed
    }
  }