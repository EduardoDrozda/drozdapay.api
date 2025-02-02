import z from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  APP_PORT: z.string().default('3333'),
});

export type EnvTypes = z.infer<typeof envSchema>;