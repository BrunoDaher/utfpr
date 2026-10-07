import { describe, it, expect } from 'vitest';
import { productSchema, createProductSchema } from './product.schema';
import { loginPayloadSchema, loginResponseSchema } from './auth.schema';
import authService from '../services/authService';

describe('Zod Schemas Validation (Requisito 7)', () => {
  it('deve validar um produto correto com sucesso', () => {
    const validProduct = {
      id: 1,
      title: 'Smartphone X',
      price: 999.99,
      stock: 10,
      category: 'smartphones',
      thumbnail: 'https://example.com/phone.jpg',
    };

    const result = productSchema.safeParse(validProduct);
    expect(result.success).toBe(true);
  });

  it('deve rejeitar produto sem título ou com preço negativo', () => {
    const invalidProduct = {
      id: 2,
      title: '',
      price: -50,
      stock: 10,
      category: 'electronics',
      thumbnail: 'https://example.com/item.jpg',
    };

    const result = productSchema.safeParse(invalidProduct);
    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.errors.map((e) => e.message);
      expect(messages).toContain('O título é obrigatório');
      expect(messages).toContain('O preço deve ser maior que zero');
    }
  });

  it('deve validar formulário de criação de produto', () => {
    const input = {
      title: 'Novo Produto',
      price: 150,
      stock: 5,
      category: 'beauty',
      description: 'Descrição válida do produto com mais de 5 caracteres',
    };

    const result = createProductSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('deve validar payload de login com username e password', () => {
    const valid = loginPayloadSchema.safeParse({
      username: 'avat',
      password: 'avatpass',
    });
    expect(valid.success).toBe(true);

    const invalid = loginPayloadSchema.safeParse({
      username: '',
      password: '',
    });
    expect(invalid.success).toBe(false);
  });

  it('deve normalizar token a partir de accessToken na resposta do login', () => {
    const rawApiData = {
      id: 1,
      username: 'avat',
      accessToken: 'jwt-dummy-token-xyz',
    };

    const parsed = loginResponseSchema.safeParse(rawApiData);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.token).toBe('jwt-dummy-token-xyz');
    }
  });
});

describe('Integração de Autenticação com DummyJSON (Validação Bloco 1.2)', () => {
  it('deve realizar login contra a API real DummyJSON com avat / avatpass', async () => {
    const result = await authService.login({
      username: 'avat',
      password: 'avatpass',
    });

    expect(result.id).toBe(1);
    expect(result.username).toBe('avat');
    expect(result.token).toBeDefined();
    expect(result.token.length).toBeGreaterThan(10);
  });
});
