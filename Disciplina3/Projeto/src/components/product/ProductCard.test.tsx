import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/test-utils';
import { ProductCard } from './ProductCard';
import { Product } from '../../schemas/product.schema';

const mockProduct: Product = {
  id: 1,
  title: 'Fone de Ouvido Bluetooth Pro',
  price: 250,
  stock: 15,
  category: 'audio',
  thumbnail: 'https://example.com/fone.jpg',
  description: 'Fone de ouvido cancelamento de ruído',
  discountPercentage: 10,
  rating: 4.7,
  brand: 'AudioTech',
  images: [],
};

describe('ProductCard Component (Requisito 8)', () => {
  it('renderiza título, categoria e preço formatado', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);

    // Verifica título
    expect(screen.getByText('Fone de Ouvido Bluetooth Pro')).toBeInTheDocument();

    // Verifica categoria
    expect(screen.getByText('audio')).toBeInTheDocument();

    // Verifica preço formatado em BRL
    expect(screen.getByText(/250,00/i)).toBeInTheDocument();

    // Verifica badge de estoque
    expect(screen.getByText(/15 em estoque/i)).toBeInTheDocument();
  });

  it('dispara callback customizado de adicionar ao carrinho ao clicar no botão Comprar', async () => {
    const handleAddToCart = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(
      <ProductCard product={mockProduct} onAddToCart={handleAddToCart} />,
    );

    const buyButton = screen.getByRole('button', { name: /comprar/i });
    await user.click(buyButton);

    expect(handleAddToCart).toHaveBeenCalledTimes(1);
    expect(handleAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('desabilita botão de compra quando produto estiver sem estoque', () => {
    const outOfStockProduct: Product = {
      ...mockProduct,
      stock: 0,
    };

    renderWithProviders(<ProductCard product={outOfStockProduct} />);

    const buyButton = screen.getByRole('button', { name: /comprar/i });
    expect(buyButton).toBeDisabled();
    expect(screen.getByText(/esgotado/i)).toBeInTheDocument();
  });
});
