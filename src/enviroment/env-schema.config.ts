import z from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.string(),
  APP_PORT: z.string(),
  DB_CLIENT: z.string(),
  DB_CONNECTION: z.string(),
  DB_SECRET: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
});

export type EnvTypes = z.infer<typeof envSchema>;