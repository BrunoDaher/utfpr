import { z } from 'zod';

export const loginPayloadSchema = z.object({
  username: z.string().min(1, 'O nome de usuário é obrigatório.'),
  password: z.string().min(1, 'A senha é obrigatória.'),
});

export type LoginPayload = z.infer<typeof loginPayloadSchema>;

export const loginResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  gender: z.string().optional(),
  image: z.string().optional(),
  accessToken: z.string().optional(),
  token: z.string().optional(),
}).transform((data) => ({
  ...data,
  token: data.token || data.accessToken || '',
}));

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export interface AuthUser {
  id: number;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
}
