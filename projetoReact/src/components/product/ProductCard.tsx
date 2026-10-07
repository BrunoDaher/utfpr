import React from 'react';
import { Card, Image, Text, Badge, Button, Group, Stack, Flex } from '@mantine/core';
import { Cart as BsCart, Eye as BsEye } from 'react-bootstrap-icons';
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
    <Card shadow="sm" padding="lg" radius="md" withBorder h="100%"
      display="flex" style={{ flexDirection: 'column' }}>
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
            <Badge color="blu" variant="light" size="sm">
              {product.category}
            </Badge>
            <Badge color={product.stock > 0 ? 'green' : 'red'} variant="dot" size="sm">
              {product.stock > 0 ? `${product.stock} em estoque` : 'Esgotado'}
            </Badge>
          </Group>

          <Text fw={600} size="md" lineClamp={2} title={product.title} style={{ minHeight: 48, lineHeight: '24px' }}>
            {product.title}
          </Text>

          <div style={{ minHeight: 20 }}>
            {product.brand && (
              <Text size="xs" c="dimmed">
                Marca: {product.brand}
              </Text>
            )}
          </div>
        </div>

        <div>
          <Text fw={700} size="xl" c="blue.4" mb="sm">
            {formattedPrice}
          </Text>


          <Flex
            gap="xs"
            wrap={{ base: 'wrap', xl: 'nowrap' }}
            justify="center" align="center">
            <Button
              variant="light"
              color="blue.4"
              size="sm"
              style={{ paddingBlock: '12px' }}
              leftSection={<BsEye size={14} />}
              onClick={() => navigate(`/produtos/${product.id}`)}
            >
              Detalhes
            </Button>
            <Button
              variant="filled"
              color="blue.4"
              size="sm"
              leftSection={<BsCart size={14} />}
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              Incluir
            </Button>
          </Flex>

        </div>
      </Stack>
    </Card >
  );
};

export default ProductCard;
