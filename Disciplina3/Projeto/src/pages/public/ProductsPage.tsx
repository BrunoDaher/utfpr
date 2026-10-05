import React, { useState, useEffect, useCallback } from 'react';
import {
  Title,
  Text,
  TextInput,
  Select,
  SimpleGrid,
  Group,
  Stack,
  Pagination,
  Paper,
  Skeleton,
  Alert,
  Center,
  Box,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch, IconAlertCircle, IconFilter } from '@tabler/icons-react';
import { ProductCard } from '../../components/product/ProductCard';
import { productService, CategoryItem } from '../../services/productService';
import { Product } from '../../schemas/product.schema';

const ITEMS_PER_PAGE = 12;

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearch] = useDebouncedValue(searchQuery, 400);
  const [selectedCategory, setSelectedCategory] = useState<string | null>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load categories once on mount
  useEffect(() => {
    let isMounted = true;
    productService
      .getCategories()
      .then((data) => {
        if (isMounted) setCategories(data);
      })
      .catch((err) => {
        console.error('Failed to load categories:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch products whenever page, debounced search, or selected category change
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const skip = (page - 1) * ITEMS_PER_PAGE;
      const data = await productService.getProducts({
        limit: ITEMS_PER_PAGE,
        skip,
        search: debouncedSearch || undefined,
        category: selectedCategory && selectedCategory !== 'all' ? selectedCategory : undefined,
      });
      setProducts(data.products);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
      setError('Não foi possível carregar os produtos. Verifique sua conexão e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, [page, debouncedSearch, selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Reset to first page when search or category changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handleCategoryChange = (val: string | null) => {
    setSelectedCategory(val);
    setPage(1);
  };

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE) || 1;

  const categorySelectData = [
    { value: 'all', label: 'Todas as Categorias' },
    ...categories.map((c) => ({
      value: c.slug,
      label: c.name,
    })),
  ];

  return (
    <Stack gap="lg">
      <Box>
        <Title order={1} c="dark.8">
          Catálogo de Produtos
        </Title>
        <Text c="dimmed" size="sm">
          Explore e busque os melhores produtos com preços atualizados em tempo real.
        </Text>
      </Box>

      {/* Filter and Search Bar */}
      <Paper p="md" radius="md" withBorder shadow="xs">
        <Group justify="space-between" align="center" wrap="wrap">
          <TextInput
            placeholder="Buscar por nome ou descrição..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ flex: 1, minWidth: 260 }}
            aria-label="Buscar produtos"
          />

          <Select
            placeholder="Filtrar por categoria"
            leftSection={<IconFilter size={16} />}
            data={categorySelectData}
            value={selectedCategory}
            onChange={handleCategoryChange}
            searchable
            clearable={false}
            style={{ minWidth: 220 }}
            aria-label="Filtrar por categoria"
          />
        </Group>
      </Paper>

      {/* Error state */}
      {error && (
        <Alert icon={<IconAlertCircle size={16} />} title="Atenção" color="red" radius="md">
          {error}
        </Alert>
      )}

      {/* Products Grid */}
      {isLoading ? (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
          {Array.from({ length: 8 }).map((_, idx) => (
            <Skeleton key={idx} height={340} radius="md" />
          ))}
        </SimpleGrid>
      ) : products.length === 0 ? (
        <Center py={60}>
          <Stack align="center" gap="xs">
            <IconAlertCircle size={40} color="#868e96" />
            <Text fw={600} size="lg" c="dimmed">
              Nenhum produto encontrado
            </Text>
            <Text size="sm" c="dimmed">
              Tente ajustar sua busca ou selecionar outra categoria.
            </Text>
          </Stack>
        </Center>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>
      )}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <Center mt="xl">
          <Pagination
            total={totalPages}
            value={page}
            onChange={setPage}
            color="indigo"
            radius="md"
            size="md"
            withEdges
          />
        </Center>
      )}
    </Stack>
  );
};

export default ProductsPage;
