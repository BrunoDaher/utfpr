import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider } from '../contexts/CartContext';
import { useCart } from './useCart';
import { Product } from '../schemas/product.schema';

const mockProductA: Product = {
  id: 101,
  title: 'Produto Teste A',
  price: 50,
  stock: 10,
  category: 'smartphones',
  thumbnail: 'https://example.com/a.jpg',
  description: 'Desc A',
  discountPercentage: 0,
  rating: 4.5,
  brand: 'Brand A',
  images: [],
};

const mockProductB: Product = {
  id: 102,
  title: 'Produto Teste B',
  price: 30,
  stock: 5,
  category: 'laptops',
  thumbnail: 'https://example.com/b.jpg',
  description: 'Desc B',
  discountPercentage: 0,
  rating: 4.8,
  brand: 'Brand B',
  images: [],
};

describe('useCart Hook & CartContext (Requisitos 2, 3 e Matriz de Testes)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('deve lançar erro explícito se usado fora do CartProvider', () => {
    expect(() => {
      renderHook(() => useCart());
    }).toThrow('useCart deve ser utilizado dentro de um CartProvider');
  });

  it('deve inicializar com o carrinho vazio', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalAmount).toBe(0);
  });

  it('deve adicionar item e recalcular totais com precisão', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProductA, 2);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].product.id).toBe(101);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.totalItems).toBe(2);
    expect(result.current.totalAmount).toBe(100);

    act(() => {
      result.current.addToCart(mockProductB, 1);
    });

    expect(result.current.items).toHaveLength(2);
    expect(result.current.totalItems).toBe(3);
    expect(result.current.totalAmount).toBe(130);
  });

  it('deve alterar a quantidade de itens no carrinho', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProductA, 1);
      result.current.updateQuantity(101, 4);
    });

    expect(result.current.items[0].quantity).toBe(4);
    expect(result.current.totalAmount).toBe(200);
  });

  it('deve remover produto do carrinho e limpar o carrinho', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProductA, 2);
      result.current.addToCart(mockProductB, 1);
      result.current.removeFromCart(101);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].product.id).toBe(102);
    expect(result.current.totalAmount).toBe(30);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalAmount).toBe(0);
  });
});
