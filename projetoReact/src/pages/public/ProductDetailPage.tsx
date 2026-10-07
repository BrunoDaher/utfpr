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
  Paper,
  Skeleton,
  Alert,
  Rating,
  Flex,
} from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import { Cart as BsCart, ArrowLeftCircle as BsArrowLeft, ExclamationCircle as BsExclamationCircle, CheckLg as BsCheckLg, Truck as BsTruck, ShieldCheck as BsShieldCheck, PlusLg as BsPlusLg, DashLg as BsDashLg } from 'react-bootstrap-icons';
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
      icon: <BsCheckLg size={16} />,
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
        <Alert icon={<BsExclamationCircle size={16} />} title="Produto Não Encontrado" color="red">
          {error || 'O produto requisitado não existe ou foi removido.'}
        </Alert>
        <Button
          mt="md"
          variant="light"
          color="blue.4"
          leftSection={<BsArrowLeft size={16} />}
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
    <Stack gap="sm">
      <Button
        variant="subtle"
        color="blue.8"
        leftSection={<BsArrowLeft size={16} />}
        onClick={() => navigate(-1)}
        style={{ width: 'fit-content' }}
      >
        Voltar
      </Button>

      <Paper p={{ base: 'md', md: 'xl' }} radius="md" withBorder shadow="xs">

        <Flex direction="row" wrap="wrap" gap="md" align="flex-start">
          {/* Coluna esquerda: Gallery / Images + Purchase Box */}
          <Stack gap="md" maw={{ base: '100%', md: 300 }} style={{ flex: '1 1 260px', minWidth: 0 }}>

            <Paper withBorder radius="md" p="sm" bg="gray.0" >
              <Image
                src={selectedImage}
                alt={product.title}
                h={{ base: 150, sm: 170, md: 190 }}
                fit="contain"
                fallbackSrc="https://placehold.co/500x500?text=Sem+Imagem"
              />

              {product.images && product.images.length > 1 && (
                <Group gap={6} justify="center" mt="xs">
                  {product.images.slice(0, 5).map((imgUrl, idx) => (
                    <Paper
                      key={idx}
                      withBorder
                      p={2}
                      radius="sm"
                      style={{
                        cursor: 'pointer',
                        borderColor: selectedImage === imgUrl ? '#a5d8ff' : undefined,
                        borderWidth: selectedImage === imgUrl ? 2 : 1,
                      }}
                      onClick={() => setSelectedImage(imgUrl)}
                    >
                      <Image src={imgUrl} w={40} h={40} fit="contain" />
                    </Paper>
                  ))}
                </Group>
              )}

            </Paper>



          </Stack>


          {/* Purchase Box */}
          <Group align="center" gap="md">


            <Button
              size="md"
              color="blue.3"
              style={{ flex: 1 }}
              leftSection={<BsCart size={18} />}
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              Adicionar
            </Button>

            <Group gap="md" mb="sm" justify='center' w='100%'>
              <Group gap="xs" >
                <BsTruck size={24} color='#f5c24cff' />
                <Text size="xs" c="dimmed">
                  Envio Rápido para todo o Brasil
                </Text>
              </Group>

              <Group gap="xs">
                <BsShieldCheck size={24} color="#2b8a3e" />
                <Text size="xs" c="dimmed">
                  Garantia e Autenticidade
                </Text>
              </Group>

            </Group>
          </Group>


          {/* Coluna direita: Details & Actions */}

          <Stack
            justify="space-between"
            mah={{ base: 200, md: 'none' }}
            style={{ flex: '2 1 300px', minWidth: 0, overflowY: 'auto' }}
          >
            <Text c='black' fw={600}>Detalhes</Text>
            <div>
              <Group justify="space-between" mb="xs">
                <Badge color="blue.3" size="md" variant="filled">
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

              <Text size="1.4rem" fw={800} c="blue.3" mb="sm">
                {formattedPrice}
              </Text>

              {product.discountPercentage > 0 && (
                <Badge color="red" variant="light" mb="md">
                  {product.discountPercentage.toFixed(0)}% OFF Especial
                </Badge>
              )}

              <Text c="gray.7" size="md" lh={1.6} mb="xl">
                {product.description}
              </Text>

            </div>
          </Stack>

        </Flex>
      </Paper>
    </Stack>
  );
};

export default ProductDetailPage;
