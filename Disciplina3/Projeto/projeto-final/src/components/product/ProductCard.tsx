import React from 'react';
import { Card, Image, Text, Badge, Button, Group, Stack } from '@mantine/core';
import { IconShoppingCart, IconEye } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../schemas/product.schema';
import { useCart } from '../../hooks/useCart';
import { notifications } from '@mantine/notifications';

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addToCart(product, 1);
      notifications.show({
        title: 'Produto Adicionado',
        message: `${product.title} foi adicionado ao seu carrinho.`,
        color: 'teal',
        autoClose: 3000,
      });
    }
  };

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder h="100%" display="flex" style={{ flexDirection: 'column' }}>
      <Card.Section>
        <Image
          src={product.thumbnail}
          height={180}
          alt={product.title}
          fallbackSrc="https://placehold.co/400x300?text=Sem+Imagem"
          fit="contain"
          p="xs"
          bg="gray.0"
        />
      </Card.Section>

      <Stack justify="space-between" mt="md" style={{ flex: 1 }}>
        <div>
          <Group justify="space-between" mb="xs">
            <Badge color="indigo" variant="light" size="sm">
              {product.category}
            </Badge>
            <Badge color={product.stock > 0 ? 'green' : 'red'} variant="dot" size="sm">
              {product.stock > 0 ? `${product.stock} em estoque` : 'Esgotado'}
            </Badge>
          </Group>

          <Text fw={600} size="md" lineClamp={2} title={product.title}>
            {product.title}
          </Text>

          {product.brand && (
            <Text size="xs" c="dimmed">
              Marca: {product.brand}
            </Text>
          )}
        </div>

        <div>
          <Text fw={700} size="xl" c="indigo.8" mb="sm">
            {formattedPrice}
          </Text>

          <Group grow gap="xs">
            <Button
              variant="light"
              color="indigo"
              size="xs"
              leftSection={<IconEye size={14} />}
              onClick={() => navigate(`/produtos/${product.id}`)}
            >
              Detalhes
            </Button>
            <Button
              variant="filled"
              color="indigo"
              size="xs"
              leftSection={<IconShoppingCart size={14} />}
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              Comprar
            </Button>
          </Group>
        </div>
      </Stack>
    </Card>
  );
};

export default ProductCard;
