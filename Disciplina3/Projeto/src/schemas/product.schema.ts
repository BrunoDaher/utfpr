import { z } from 'zod';

export const productSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'O título é obrigatório'),
  price: z.number().positive('O preço deve ser maior que zero'),
  stock: z.number().int().nonnegative('O estoque não pode ser negativo'),
  category: z.string().min(1, 'A categoria é obrigatória'),
  thumbnail: z.string().url('URL inválida').or(z.string().min(1)),
  description: z.string().optional().default(''),
  discountPercentage: z.number().optional().default(0),
  rating: z.number().optional().default(0),
  brand: z.string().optional(),
  images: z.array(z.string()).optional().default([]),
});

export type Product = z.infer<typeof productSchema>;

export const productsResponseSchema = z.object({
  products: z.array(productSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export type ProductsResponse = z.infer<typeof productsResponseSchema>;

export const createProductSchema = z.object({
  title: z.string().min(2, 'O título deve ter pelo menos 2 caracteres'),
  price: z.coerce.number().positive('O preço deve ser maior que zero'),
  stock: z.coerce.number().int().min(0, 'O estoque não pode ser negativo'),
  category: z.string().min(1, 'Selecione uma categoria'),
  description: z.string().min(5, 'A descrição deve ter pelo menos 5 caracteres'),
  thumbnail: z.string().url('Informe uma URL de imagem válida').optional().or(z.literal('')),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
