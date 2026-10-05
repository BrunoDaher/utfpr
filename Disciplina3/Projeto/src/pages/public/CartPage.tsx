import React, { useState } from 'react';
import {
  Title,
  Text,
  Table,
  Image,
  Group,
  Stack,
  Button,
  ActionIcon,
  Paper,
  Grid,
  Divider,
  Center,
  Modal,
} from '@mantine/core';
import {
  IconTrash,
  IconPlus,
  IconMinus,
  IconShoppingCart,
  IconArrowLeft,
  IconCheck,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { notifications } from '@mantine/notifications';

export const CartPage: React.FC = () => {
  const { items, totalItems, totalAmount, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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
      icon: <IconCheck size={16} />,
      autoClose: 5000,
    });
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <Paper p={50} radius="md" withBorder shadow="xs">
        <Center>
          <Stack align="center" gap="md">
            <IconShoppingCart size={64} color="#adb5bd" />
            <Title order={3} c="dark.6">
              Seu carrinho está vazio
            </Title>
            <Text c="dimmed" size="sm">
              Navegue pelo nosso catálogo e descubra produtos incríveis!
            </Text>
            <Button
              variant="filled"
              color="indigo"
              leftSection={<IconArrowLeft size={16} />}
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
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Title order={1} c="dark.8">
            Carrinho de Compras
          </Title>
          <Text c="dimmed" size="sm">
            {totalItems} {totalItems === 1 ? 'item' : 'itens'} adicionados
          </Text>
        </div>

        <Button variant="subtle" color="red" size="xs" onClick={clearCart}>
          Limpar Carrinho
        </Button>
      </Group>

      <Grid gutter="xl">
        {/* Items List */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Paper p="md" radius="md" withBorder shadow="xs">
            <Table verticalSpacing="sm" highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Produto</Table.Th>
                  <Table.Th>Preço Unitário</Table.Th>
                  <Table.Th>Quantidade</Table.Th>
                  <Table.Th>Subtotal</Table.Th>
                  <Table.Th style={{ width: 50 }}></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {items.map(({ product, quantity }) => (
                  <Table.Tr key={product.id}>
                    <Table.Td>
                      <Group gap="sm">
                        <Image
                          src={product.thumbnail}
                          alt={product.title}
                          w={50}
                          h={50}
                          fit="contain"
                          radius="sm"
                          bg="gray.0"
                        />
                        <div>
                          <Text fw={600} size="sm" lineClamp={1}>
                            {product.title}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {product.category}
                          </Text>
                        </div>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{formatPrice(product.price)}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap={4}>
                        <ActionIcon
                          size="sm"
                          variant="light"
                          color="gray"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          disabled={quantity <= 1}
                        >
                          <IconMinus size={12} />
                        </ActionIcon>
                        <Text size="sm" fw={600} px={6}>
                          {quantity}
                        </Text>
                        <ActionIcon
                          size="sm"
                          variant="light"
                          color="indigo"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          disabled={quantity >= product.stock}
                        >
                          <IconPlus size={12} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Text fw={700} size="sm" c="indigo.7">
                        {formatPrice(product.price * quantity)}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <ActionIcon
                        color="red"
                        variant="subtle"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Remover ${product.title}`}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        </Grid.Col>

        {/* Order Summary */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper p="xl" radius="md" withBorder shadow="xs">
            <Title order={3} mb="md">
              Resumo do Pedido
            </Title>

            <Stack gap="xs">
              <Group justify="space-between">
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

              <Divider my="sm" />

              <Group justify="space-between">
                <Text fw={700} size="lg">
                  Total Final
                </Text>
                <Text fw={800} size="xl" c="indigo.8">
                  {formatPrice(finalTotal)}
                </Text>
              </Group>

              <Button
                mt="md"
                size="md"
                color="indigo"
                fullWidth
                onClick={handleCheckout}
                leftSection={<IconCheck size={18} />}
              >
                Finalizar Compra
              </Button>

              <Button
                variant="subtle"
                color="gray"
                size="sm"
                fullWidth
                onClick={() => navigate('/')}
              >
                Continuar Comprando
              </Button>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>

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
