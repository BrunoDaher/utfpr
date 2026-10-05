import { z } from 'zod';

export const NewPostSchema = z.object({
  title: z
    .string()
    .min(3, 'O título deve ter pelo menos 3 caracteres')
    .max(100, 'O título deve ter no máximo 100 caracteres'),
  body: z
    .string()
    .min(5, 'O conteúdo deve ter pelo menos 5 caracteres')
    .max(500, 'O conteúdo deve ter no máximo 500 caracteres'),
});

export type NewPostSchema = z.infer<typeof NewPostSchema>;
