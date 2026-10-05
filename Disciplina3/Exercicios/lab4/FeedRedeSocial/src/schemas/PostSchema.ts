import { z } from 'zod';

export const PostSchema = z.object({
  userId: z.number().optional().default(1),
  id: z.number().optional(),
  title: z.string().min(1, 'Título é obrigatório'),
  body: z.string().min(1, 'Conteúdo é obrigatório'),
});

export type PostSchema = z.infer<typeof PostSchema>;
