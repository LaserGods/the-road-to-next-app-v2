declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      VERCEL_ENV: "development" | "preview" | "production";
      VERCEL_OIDC_TOKEN: string;
      AWS_BUCKET_NAME: string;
      AWS_BUCKET_REGION: string;
      AWS_ROLE_ARN_DEV: string;
      AWS_ROLE_ARN: string;
    }
  }
}

export {};
