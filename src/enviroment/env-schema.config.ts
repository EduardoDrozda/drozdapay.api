import z from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.string(),
  APP_PORT: z.string(),
});

export type EnvTypes = z.infer<typeof envSchema>;