import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

// .env.local wins over .env. Variables already set in the shell are left alone.
config({ path: [".env.local", ".env"], quiet: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "pnpm exec tsx prisma/private-seed.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
