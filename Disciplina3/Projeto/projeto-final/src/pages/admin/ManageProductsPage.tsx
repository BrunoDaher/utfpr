import React, { useState, useEffect, useCallback } from 'react';
import {
  Title,
  Text,
  Table,
  Button,
  Group,
  Stack,
  ActionIcon,
  Modal,
  TextInput,
  NumberInput,
  Textarea,
  Select,
  Paper,
  Badge,
  Pagination,
  Center,
  Skeleton,
  Image,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconPackage,
  IconCheck,
} from '@tabler/icons-react';
import {
  createProductSchema,
  CreateProductInput,
  Product,
} from '../../schemas/product.schema';
import { productService, CategoryItem } from '../../services/productService';
import { notifications } from '@mantine/notifications';

const ITEMS_PER_PAGE = 8;

export const ManageProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<CreateProductInput>({
    initialValues: {
      title: '',
      price: 0,
      stock: 0,
      category: '',
      description: '',
      thumbnail: '',
    },
    validate: zodResolver(createProductSchema),
  });

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [productsData, categoriesData] = await Promise.all([
        productService.getProducts({
          limit: ITEMS_PER_PAGE,
          skip: (page - 1) * ITEMS_PER_PAGE,
        }),
        productService.getCategories(),
      ]);
      setProducts(productsData.products);
      setTotal(productsData.total);
      setCategories(categoriesData);
    } catch (err) {
      console.error(err);
      notifications.show({
        title: 'Erro',
        message: 'Não foi possível carregar os dados administrativos.',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleOpenCreate = () => {
    setEditingProduct(null);
    form.reset();
    form.setValues({
      title: '',
      price: 0,
      stock: 0,
      category: categories[0]?.slug || 'beauty',
      description: '',
      thumbnail: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    form.setValues({
      title: product.title,
      price: product.price,
      stock: product.stock,
      category: product.category,
      description: product.description || '',
      thumbnail: product.thumbnail || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (values: CreateProductInput) => {
    setIsSubmitting(true);
    try {
      if (editingProduct) {
        // Update product
        await productService.updateProduct(editingProduct.id, values);
        setProducts((prev) =>
          prev.map((p) =>
            p.id === editingProduct.id
              ? {
                  ...p,
                  ...values,
                  thumbnail: values.thumbnail || p.thumbnail,
                }
              : p,
          ),
        );
        notifications.show({
          title: 'Produto Atualizado',
          message: `O produto "${values.title}" foi atualizado com sucesso!`,
          color: 'teal',
          icon: <IconCheck size={16} />,
        });
      } else {
        // Add new product
        const newProduct = await productService.addProduct(values);
        setProducts((prev) => [
          {
            ...newProduct,
            id: newProduct.id || Date.now(),
            thumbnail: values.thumbnail || 'https://placehold.co/400x300?text=Novo+Produto',
          },
          ...prev,
        ]);
        setTotal((prev) => prev + 1);
        notifications.show({
          title: 'Produto Cadastrado',
          message: `O produto "${values.title}" foi cadastrado com sucesso!`,
          color: 'teal',
          icon: <IconCheck size={16} />,
        });
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      notifications.show({
        title: 'Erro ao salvar',
        message: 'Falha ao salvar produto. Tente novamente.',
        color: 'red',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (product: Product) => {
    if (!window.confirm(`Deseja realmente remover o produto "${product.title}"?`)) {
      return;
    }
    try {
      await productService.deleteProduct(product.id);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
      setTotal((prev) => Math.max(0, prev - 1));
      notifications.show({
        title: 'Produto Removido',
        message: `O produto "${product.title}" foi removido do catálogo.`,
        color: 'blue',
      });
    } catch (err) {
      console.error(err);
      notifications.show({
        title: 'Erro ao excluir',
        message: 'Não foi possível remover o produto.',
        color: 'red',
      });
    }
  };

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE) || 1;

  const formatPrice = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2} c="dark.8">
            Gestão de Produtos
          </Title>
          <Text size="sm" c="dimmed">
            Cadastre, edite, altere estoques e remova produtos do catálogo geral.
          </Text>
        </div>

        <Button
          color="indigo"
          leftSection={<IconPlus size={16} />}
          onClick={handleOpenCreate}
        >
          Novo Produto
        </Button>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="xs">
        {isLoading ? (
          <Stack gap="sm">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} height={50} radius="sm" />
            ))}
          </Stack>
        ) : (
          <Table verticalSpacing="sm" highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Produto</Table.Th>
                <Table.Th>Categoria</Table.Th>
                <Table.Th>Preço</Table.Th>
                <Table.Th>Estoque</Table.Th>
                <Table.Th style={{ textAlign: 'right' }}>Ações</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {products.map((p) => (
                <Table.Tr key={p.id}>
                  <Table.Td>
                    <Text size="xs" c="dimmed">
                      #{p.id}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="sm">
                      <Image
                        src={p.thumbnail}
                        w={36}
                        h={36}
                        fit="contain"
                        radius="xs"
                        bg="gray.0"
                        fallbackSrc="https://placehold.co/100x100?text=Item"
                      />
                      <Text fw={600} size="sm" lineClamp={1}>
                        {p.title}
                      </Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Badge variant="light" color="indigo" size="sm">
                      {p.category}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" fw={600}>
                      {formatPrice(p.price)}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge color={p.stock > 0 ? 'green' : 'red'} size="sm">
                      {p.stock} un
                    </Badge>
                  </Table.Td>
                  <Table.Td style={{ textAlign: 'right' }}>
                    <Group gap={6} justify="flex-end">
                      <ActionIcon
                        variant="subtle"
                        color="blue"
                        onClick={() => handleOpenEdit(p)}
                        aria-label={`Editar ${p.title}`}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => handleDelete(p)}
                        aria-label={`Excluir ${p.title}`}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Paper>

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <Center mt="md">
          <Pagination
            total={totalPages}
            value={page}
            onChange={setPage}
            color="indigo"
            radius="md"
          />
        </Center>
      )}

      {/* Modal de Cadastro / Edição com Validação Zod */}
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          <Group gap="xs">
            <IconPackage size={20} color="#4c6ef5" />
            <Text fw={700}>
              {editingProduct ? 'Editar Produto' : 'Cadastrar Novo Produto'}
            </Text>
          </Group>
        }
        centered
        size="lg"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Título do Produto"
              placeholder="Ex: Teclado Mecânico RGB"
              required
              {...form.getInputProps('title')}
            />

            <Group grow>
              <NumberInput
                label="Preço (R$)"
                placeholder="0.00"
                min={0.01}
                decimalScale={2}
                required
                {...form.getInputProps('price')}
              />

              <NumberInput
                label="Quantidade em Estoque"
                placeholder="0"
                min={0}
                required
                {...form.getInputProps('stock')}
              />
            </Group>

            <Select
              label="Categoria"
              placeholder="Selecione a categoria"
              required
              data={categories.map((c) => ({ value: c.slug, label: c.name }))}
              {...form.getInputProps('category')}
            />

            <TextInput
              label="URL da Imagem (Thumbnail)"
              placeholder="https://exemplo.com/imagem.jpg"
              {...form.getInputProps('thumbnail')}
            />

            <Textarea
              label="Descrição Detalhada"
              placeholder="Descreva as características técnicas e diferenciais do produto..."
              minRows={3}
              required
              {...form.getInputProps('description')}
            />

            <Group justify="flex-end" mt="md">
              <Button variant="default" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" color="indigo" loading={isSubmitting}>
                {editingProduct ? 'Salvar Alterações' : 'Cadastrar Produto'}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Stack>
  );
};

export default ManageProductsPage;
