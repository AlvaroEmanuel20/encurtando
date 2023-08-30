import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Minimum 8 characters'),
  }),
});
