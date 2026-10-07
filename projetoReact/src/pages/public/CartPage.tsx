import React, { useState } from 'react';
import {
  Title,
  Text,
  Image,
  Group,
  Stack,
  Button,
  ActionIcon,
  Paper,
  Center,
  Modal,
  Flex,
} from '@mantine/core';
import { Trash as BsTrash, PlusLg as BsPlusLg, DashLg as BsDashLg, Cart as BsCart, ArrowLeft as BsArrowLeft, CheckLg as BsCheckLg } from 'react-bootstrap-icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { notifications } from '@mantine/notifications';

export const CartPage: React.FC = () => {
  const { items, totalItems, totalAmount, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const searchQuery = (searchParams.get('q') || '').toLowerCase();
  const filteredItems = items.filter(({ product }) =>
    product.title.toLowerCase().includes(searchQuery) ||
    product.category.toLowerCase().includes(searchQuery) ||
    (product.brand && product.brand.toLowerCase().includes(searchQuery))
  );

  const formatPrice = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const handleCheckout = () => {
    setIsSuccessModalOpen(true);
  };

  const handleFinishPurchase = () => {
    clearCart();
    setIsSuccessModalOpen(false);
    notifications.show({
      title: 'Compra Concluída com Sucesso!',
      message: 'Obrigado por comprar conosco. Seu pedido foi processado!',
      color: 'teal',
      icon: <BsCheckLg size={16} />,
      autoClose: 5000,
    });
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <Paper p={50} radius="md" withBorder shadow="xs">
        <Center>
          <Stack align="center" gap="md">
            <BsCart size={64} color="#adb5bd" />
            <Title order={3} c="dark.6">
              Seu carrinho está vazio
            </Title>
            <Text c="dimmed" size="sm">
              Navegue pelo nosso catálogo e descubra produtos incríveis!
            </Text>
            <Button
              variant="filled"
              color="blue.3"
              leftSection={<BsArrowLeft size={16} />}
              onClick={() => navigate('/')}
            >
              Ir às Compras
            </Button>
          </Stack>
        </Center>
      </Paper>
    );
  }

  const discount = totalAmount * 0.05; // 5% de desconto promocional
  const finalTotal = totalAmount - discount;

  return (
    <Stack gap="lg" pt="sm" h="100%">

      <Flex direction={{ base: 'column', xs: 'row' }} gap="md" style={{ flex: 1, minHeight: 0 }}>
        {/* Items List */}
        <Stack flex={{ base: 4, xs: 1, md: '7 1 0' }} style={{ minWidth: 0, minHeight: 0 }} gap="xs">
          <Paper p="md" radius="md" withBorder shadow="xs" style={{ flex: 1, overflowY: 'scroll', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <Stack gap="md" >
              {filteredItems.map(({ product, quantity }) => (
                <Paper variant='light' key={product.id} p="md" bg="#fdfdfd" radius="sm" withBorder>
                  <Flex direction={{ base: 'column', sm: 'row' }}
                    justify="space-between"
                    align={{ base: 'flex-start', sm: 'center' }}
                    gap="md">

                    <Group wrap="nowrap" gap="md" style={{ flex: 1 }}>

                      <Paper p="xs" radius="md" bg="white.4" withBorder>
                        <Image
                          src={product.thumbnail}
                          alt={product.title}
                          w={80}
                          h={80}
                          fit="contain"
                          radius="sm"
                        />
                      </Paper>

                      <Stack gap={4} style={{ flex: 1 }}>
                        <Text fw={700} size="lg" lineClamp={2} c="dark.8">
                          {product.title}
                        </Text>
                        <Text size="sm" c="dimmed">
                          {product.category}
                        </Text>
                        <Text size="md" fw={800} c="blue.4" mt={4}>
                          {formatPrice(product.price)}
                        </Text>
                      </Stack>

                    </Group>

                    <Flex direction={{ base: 'row-reverse', sm: 'column' }}
                      align={{ base: 'center', sm: 'flex-end' }}
                      justify="space-between"
                      w={{ base: '100%', sm: 'auto' }}
                      style={{ height: '100%', gap: '10px' }}>
                      <ActionIcon
                        color="red"
                        variant="subtle"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Remover ${product.title}`}
                      >
                        <BsTrash size={18} />
                      </ActionIcon>

                      <Group gap={6} align="center">
                        <ActionIcon
                          size="md"
                          variant="outline"
                          color="red"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          disabled={quantity <= 1}
                        >
                          <BsDashLg size={14} />
                        </ActionIcon>

                        <Text size="md" fw={700} w={30} ta="center">
                          {quantity}
                        </Text>

                        <ActionIcon
                          size="md"
                          variant="outline"
                          color="green"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          disabled={quantity >= product.stock}
                        >
                          <BsPlusLg size={14} />
                        </ActionIcon>
                      </Group>
                    </Flex>
                  </Flex>
                </Paper>
              ))}

              {items.length > 0 && filteredItems.length === 0 && (
                <Center p="xl">
                  <Text c="dimmed">Nenhum item encontrado no carrinho com "{searchQuery}".</Text>
                </Center>
              )}
            </Stack>
          </Paper>
        </Stack>

        {/* Order Summary */}
        <Stack w={{ base: '100%', xs: '45%', md: 'auto' }}
          flex={{ base: 3, xs: '0 0 auto', md: '3 1 1' }} style={{ minWidth: 0, minHeight: 0 }}>
          <Paper
            p={{ base: 'md', xs: 'xl' }}
            radius="md"
            shadow="xs"
            style={{ overflowY: 'auto' }}>

            <Title order={3}
              bg="gray.1"
              mb="sm"
              p="sm"
              c="blue.3"
              style={{ borderRadius: '5px' }}
            >
              Resumo do Pedido
            </Title>

            <Stack gap="xs">
              <Group justify="">
                <Text size="sm" c="dimmed">
                  Subtotal ({totalItems} itens)
                </Text>
                <Text size="sm" fw={600}>
                  {formatPrice(totalAmount)}
                </Text>
              </Group>

              <Group justify="space-between">
                <Text size="sm" c="green.7">
                  Desconto à vista (5%)
                </Text>
                <Text size="sm" fw={600} c="green.7">
                  - {formatPrice(discount)}
                </Text>
              </Group>

              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  Frete
                </Text>
                <Text size="sm" fw={600} c="teal">
                  GRÁTIS
                </Text>
              </Group>

              <Group justify="space-between" bg="gray.1" p="sm">
                <Text fw={700} size="md">
                  Total Final
                </Text>
                <Text fw={800} size="md" c="green">
                  {formatPrice(finalTotal)}
                </Text>
              </Group>

              <Group wrap="wrap" style={{ display: 'flex', flexDirection: 'row', gap: '8px' }} >
                <Button
                  size="sm"
                  color="green"
                  fullWidth
                  onClick={handleCheckout}
                >
                  Finalizar Compra
                </Button>

                <Button
                  variant="light"
                  color="red"
                  fullWidth
                  onClick={clearCart}
                  leftSection={<BsTrash size={16} />}
                >
                  Limpar Carrinho
                </Button>
              </Group>

            </Stack>
          </Paper>
        </Stack>
      </Flex>

      {/* Checkout Confirmation Modal */}
      <Modal
        opened={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Confirmar Pedido"
        centered
      >
        <Stack gap="md">
          <Text size="sm">
            Deseja confirmar a compra no valor total de <strong>{formatPrice(finalTotal)}</strong>?
          </Text>
          <Text size="xs" c="dimmed">
            Esta é uma simulação de compra consumindo os produtos da DummyJSON.
          </Text>
          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={() => setIsSuccessModalOpen(false)}>
              Cancelar
            </Button>
            <Button color="indigo" onClick={handleFinishPurchase}>
              Confirmar Pagamento
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default CartPage;
