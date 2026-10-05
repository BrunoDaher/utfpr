import React, { useEffect, useState } from 'react';
import {
  Grid,
  Image,
  Text,
  Title,
  Badge,
  Group,
  Stack,
  Button,
  NumberInput,
  Paper,
  Skeleton,
  Alert,
  Rating,
  Divider,
} from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import {
  IconShoppingCart,
  IconArrowLeft,
  IconAlertCircle,
  IconCheck,
  IconTruck,
  IconShieldCheck,
} from '@tabler/icons-react';
import { productService } from '../../services/productService';
import { Product } from '../../schemas/product.schema';
import { useCart } from '../../hooks/useCart';
import { notifications } from '@mantine/notifications';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    setError(null);

    productService
      .getProductById(id)
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.thumbnail || data.images?.[0] || '');
      })
      .catch((err) => {
        console.error(err);
        setError('Não foi possível carregar os detalhes do produto selecionado.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    notifications.show({
      title: 'Item adicionado ao carrinho',
      message: `${quantity}x ${product.title} foi adicionado ao seu carrinho com sucesso!`,
      color: 'teal',
      icon: <IconCheck size={16} />,
      autoClose: 3500,
    });
  };

  if (isLoading) {
    return (
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Skeleton height={400} radius="md" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack gap="md">
            <Skeleton height={40} width="70%" />
            <Skeleton height={20} width="40%" />
            <Skeleton height={30} width="30%" />
            <Skeleton height={120} />
            <Skeleton height={50} width="50%" />
          </Stack>
        </Grid.Col>
      </Grid>
    );
  }

  if (error || !product) {
    return (
      <Paper p="xl" withBorder radius="md">
        <Alert icon={<IconAlertCircle size={16} />} title="Produto Não Encontrado" color="red">
          {error || 'O produto requisitado não existe ou foi removido.'}
        </Alert>
        <Button
          mt="md"
          variant="light"
          leftSection={<IconArrowLeft size={16} />}
          onClick={() => navigate('/')}
        >
          Voltar ao Catálogo
        </Button>
      </Paper>
    );
  }

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  return (
    <Stack gap="lg">
      <Button
        variant="subtle"
        color="gray"
        leftSection={<IconArrowLeft size={16} />}
        onClick={() => navigate(-1)}
        style={{ width: 'fit-content' }}
      >
        Voltar
      </Button>

      <Paper p="xl" radius="md" withBorder shadow="xs">
        <Grid gutter={40}>
          {/* Gallery / Images */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack>
              <Paper withBorder radius="md" p="md" bg="gray.0">
                <Image
                  src={selectedImage}
                  alt={product.title}
                  height={360}
                  fit="contain"
                  fallbackSrc="https://placehold.co/500x500?text=Sem+Imagem"
                />
              </Paper>

              {product.images && product.images.length > 1 && (
                <Group gap="xs" justify="center">
                  {product.images.slice(0, 5).map((imgUrl, idx) => (
                    <Paper
                      key={idx}
                      withBorder
                      p={4}
                      radius="sm"
                      style={{
                        cursor: 'pointer',
                        borderColor: selectedImage === imgUrl ? '#4c6ef5' : undefined,
                        borderWidth: selectedImage === imgUrl ? 2 : 1,
                      }}
                      onClick={() => setSelectedImage(imgUrl)}
                    >
                      <Image src={imgUrl} width={60} height={60} fit="contain" />
                    </Paper>
                  ))}
                </Group>
              )}
            </Stack>
          </Grid.Col>

          {/* Details & Actions */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack justify="space-between" h="100%">
              <div>
                <Group justify="space-between" mb="xs">
                  <Badge color="indigo" size="md" variant="filled">
                    {product.category}
                  </Badge>
                  <Badge color={product.stock > 0 ? 'teal' : 'red'} variant="light" size="md">
                    {product.stock > 0 ? `${product.stock} disponíveis` : 'Fora de estoque'}
                  </Badge>
                </Group>

                <Title order={2} mb="xs">
                  {product.title}
                </Title>

                {product.brand && (
                  <Text size="sm" c="dimmed" mb="xs">
                    Marca: <strong>{product.brand}</strong>
                  </Text>
                )}

                {product.rating > 0 && (
                  <Group gap="xs" mb="md">
                    <Rating value={product.rating} fractions={2} readOnly />
                    <Text size="sm" c="dimmed">
                      ({product.rating.toFixed(1)} / 5.0)
                    </Text>
                  </Group>
                )}

                <Text size="2.2rem" fw={800} c="indigo.8" mb="sm">
                  {formattedPrice}
                </Text>

                {product.discountPercentage > 0 && (
                  <Badge color="orange" variant="light" mb="md">
                    {product.discountPercentage.toFixed(0)}% OFF Especial
                  </Badge>
                )}

                <Text c="gray.7" size="md" lh={1.6} mb="xl">
                  {product.description}
                </Text>

                <Divider my="md" />

                <Group gap="xl" mb="lg">
                  <Group gap="xs">
                    <IconTruck size={20} color="#4c6ef5" />
                    <Text size="xs" c="dimmed">
                      Envio Rápido para todo o Brasil
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <IconShieldCheck size={20} color="#2b8a3e" />
                    <Text size="xs" c="dimmed">
                      Garantia e Autenticidade
                    </Text>
                  </Group>
                </Group>
              </div>

              {/* Purchase Box */}
              <Paper p="md" withBorder radius="md" bg="gray.0">
                <Group align="flex-end" gap="md">
                  <NumberInput
                    label="Quantidade"
                    value={quantity}
                    onChange={(val) => setQuantity(Number(val) || 1)}
                    min={1}
                    max={product.stock || 1}
                    disabled={product.stock <= 0}
                    style={{ width: 120 }}
                  />

                  <Button
                    size="md"
                    color="indigo"
                    style={{ flex: 1 }}
                    leftSection={<IconShoppingCart size={18} />}
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                  >
                    Adicionar ao Carrinho
                  </Button>
                </Group>
              </Paper>
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>
    </Stack>
  );
};

export default ProductDetailPage;
