import React, { useState, useEffect, useCallback } from 'react';
import {
  Title,
  Text,
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
  Skeleton,
  Image,
  Flex,
  Box,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import { zodResolver } from 'mantine-form-zod-resolver';
import { PlusLg as BsPlusLg, Pencil as BsPencil, Trash as BsTrash, BoxSeam as BsBoxSeam, CheckLg as BsCheckLg, Search as BsSearch } from 'react-bootstrap-icons';
import {
  createProductSchema,
  CreateProductInput,
  Product,
} from '../../schemas/product.schema';
import { productService, CategoryItem } from '../../services/productService';
import { notifications } from '@mantine/notifications';
export const ManageProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearch] = useDebouncedValue(searchQuery, 400);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const dynamicItemsPerPage = Math.max(10, Math.ceil(total / 10));
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
          limit: dynamicItemsPerPage,
          skip: (page - 1) * dynamicItemsPerPage,
          search: debouncedSearch || undefined,
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
  }, [page, debouncedSearch, dynamicItemsPerPage]);

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
          icon: <BsCheckLg size={16} />,
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
          icon: <BsCheckLg size={16} />,
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
  const calculatedTotalPages = Math.ceil(total / dynamicItemsPerPage) || 1;
  const totalPages = Math.min(10, calculatedTotalPages);

  const formatPrice = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <Stack gap="xs" style={{ height: '100%' }}>
      <Flex direction={{ base: 'column', sm: 'row' }} justify="space-between" align={{ base: 'stretch', sm: 'center' }} gap="md">
        <div>
          <Title order={3}>
            Gestão de Produtos
          </Title>
          <Text size="xs" c="dimmed" lineClamp={1}>
            Cadastre, edite, altere estoques e remova produtos.
          </Text>
        </div>

        <Flex gap="sm" align="center" justify="space-between">
          <TextInput
            placeholder="Buscar..."
            leftSection={<BsSearch size={14} />}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.currentTarget.value);
              setPage(1);
            }}
            size="xs"
            style={{ flex: 1 }}
          />
          <Button
            color="indigo"
            size="xs"
            leftSection={<BsPlusLg size={14} />}
            onClick={handleOpenCreate}
            style={{ flexShrink: 0 }}
          >
            Novo
          </Button>
        </Flex>
      </Flex>

      <Paper p="xs" radius="md" withBorder shadow="xs" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ flex: 1, overflowY: 'scroll' }}>
          <Stack gap={0}>
            {/* Header Desktop */}
            <Flex display={{ base: 'none', md: 'flex' }} px="sm" py="xs" c="dimmed" fw={600}>
              <div style={{ width: 80 }}><Text size="sm">ID</Text></div>
              <div style={{ flex: 1 }}><Text size="sm">Produto</Text></div>
              <div style={{ width: 150 }}><Text size="sm">Categoria</Text></div>
              <div style={{ width: 120 }}><Text size="sm">Preço</Text></div>
              <div style={{ width: 100 }}><Text size="sm">Estoque</Text></div>
              <div style={{ width: 100, textAlign: 'right' }}><Text size="sm">Ações</Text></div>
            </Flex>

            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Flex key={i} direction={{ base: 'column', md: 'row' }} align={{ base: 'stretch', md: 'center' }} gap="sm" p="sm" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <div style={{ width: 80, display: 'none' }} className="desktop-id"></div>
                  <Group gap="sm" style={{ flex: 1 }}>
                    <Skeleton height={36} width={36} radius="xs" />
                    <Skeleton height={20} width={150} />
                  </Group>
                  <Flex align="center" justify="space-between" mt={{ base: 'sm', md: 0 }}>
                    <div style={{ width: 150 }}><Skeleton height={20} width={80} /></div>
                    <div style={{ width: 120 }}><Skeleton height={20} width={60} /></div>
                    <div style={{ width: 100 }}><Skeleton height={20} width={60} /></div>
                    <div style={{ width: 100, textAlign: 'right' }}>
                      <Group gap={6} justify="flex-end" wrap="nowrap">
                        <Skeleton height={24} width={24} circle />
                        <Skeleton height={24} width={24} circle />
                      </Group>
                    </div>
                  </Flex>
                </Flex>
              ))
            ) : (
              products.map((p) => (
                <Flex key={p.id} direction={{ base: 'column', md: 'row' }} align={{ base: 'stretch', md: 'center' }} gap="sm" p="sm" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <div style={{ width: 80 }}>
                    <Text size="xs" c="dimmed">#{p.id}</Text>
                  </div>
                  <Group gap="sm" style={{ flex: 1 }}>
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
                  <Flex align="center" justify="space-between" mt={{ base: 'sm', md: 0 }} wrap={{ base: 'wrap', md: 'nowrap' }} gap="sm">
                    <Box w={{ base: 'auto', md: 150 }}>
                      <Badge variant="light" color="indigo" size="sm">{p.category}</Badge>
                    </Box>
                    <Box w={{ base: 'auto', md: 120 }}>
                      <Text size="sm" fw={600}>{formatPrice(p.price)}</Text>
                    </Box>
                    <Box w={{ base: 'auto', md: 100 }}>
                      <Badge color={p.stock > 0 ? 'green' : 'red'} size="sm">{p.stock} un</Badge>
                    </Box>
                    <Box w={{ base: 'auto', md: 100 }} style={{ textAlign: 'right' }}>
                      <Group gap={6} justify="flex-end" wrap="nowrap">
                        <ActionIcon
                          variant="subtle"
                          color="blue"
                          onClick={() => handleOpenEdit(p)}
                          aria-label={`Editar ${p.title}`}
                        >
                          <BsPencil size={16} />
                        </ActionIcon>
                        <ActionIcon
                          variant="subtle"
                          color="red"
                          onClick={() => handleDelete(p)}
                          aria-label={`Excluir ${p.title}`}
                        >
                          <BsTrash size={16} />
                        </ActionIcon>
                      </Group>
                    </Box>
                  </Flex>
                </Flex>
              ))
            )}
          </Stack>
        </div>
      </Paper>

      {/* Pagination */}
      {totalPages > 1 && (
        <Flex direction={{ base: 'column', xs: 'row' }} justify="space-between" align="center" gap="md">
          <Text size="xs" c="dimmed">
            Página {page} de {totalPages}
          </Text>
          <Pagination
            total={totalPages}
            value={page}
            onChange={setPage}
            disabled={isLoading}
            color="indigo"
            radius="md"
            size="sm"
            siblings={1}
            boundaries={1}
            withControls={false}
          />
        </Flex>
      )}

      {/* Modal de Cadastro / Edição com Validação Zod */}
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          <Group gap="xs">
            <BsBoxSeam size={20} color="#4c6ef5" />
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
