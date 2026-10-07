import React, { useState, useEffect, useCallback } from 'react';
import {
  Title,
  Text,
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
  Flex,
  Card,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { ExclamationCircle as BsExclamationCircle, Filter as BsFilter } from 'react-bootstrap-icons';
import { ProductCard } from '../../components/product/ProductCard';
import { productService, CategoryItem } from '../../services/productService';
import { Product } from '../../schemas/product.schema';

import { useSearchParams } from 'react-router-dom';

export const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<string>('10');
  const searchQuery = searchParams.get('q') || '';
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

  // Fetch products whenever page, debounced search, category or itemsPerPage change
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const limit = parseInt(itemsPerPage);
      const skip = (page - 1) * limit;
      const data = await productService.getProducts({
        limit,
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
  }, [page, itemsPerPage, debouncedSearch, selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCategoryChange = (val: string | null) => {
    setSelectedCategory(val);
    setPage(1);
  };

  const handleItemsPerPageChange = (val: string | null) => {
    if (val) {
      setItemsPerPage(val);
      setPage(1);
    }
  };

  const calculatedTotalPages = Math.ceil(total / parseInt(itemsPerPage)) || 1;
  const totalPages = Math.min(10, calculatedTotalPages);

  const categorySelectData = [
    { value: 'all', label: 'Todas as Categorias' },
    ...categories.map((c) => ({
      value: c.slug,
      label: c.name,
    })),
  ];

  return (
    <Stack gap="sm" style={{ height: '100%' }}>
      {/* Cabeçalho do Catálogo com Gradiente (Azul, Verde, Preto e Branco) */}
      <Box
        p="md"
        style={{
          background: 'linear-gradient(135deg, #1c7ed6 0%, #2b8a3e 33%, #141414 66%, #ffffff 100%)',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <Group justify="space-between" align="center" wrap="wrap">
          <Box style={{ flex: 1, minWidth: 1200 }}>
            <Title order={2} c="white" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}>
              Catálogo de Produtos
            </Title>
            <Text c="white" size="sm" visibleFrom="sm" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}>
              Explore e busque os melhores preços
            </Text>
          </Box>
        </Group>
      </Box>

      <Flex direction={{ base: 'column', xs: 'row' }} gap="md" style={{ flex: 1, minHeight: 0 }}>
        {/* Coluna Esquerda: Filtros */}
        <Stack w={{ base: '100%', xs: '35%', md: 280 }} style={{ flexShrink: 0 }} gap="xs">
          <Paper p="sm" radius="md" withBorder shadow="xs">
            <Select
              label="Filtrar por Categoria"
              placeholder="Selecione uma categoria"
              leftSection={<BsFilter size={16} />}
              data={categorySelectData}
              value={selectedCategory}
              onChange={handleCategoryChange}
              searchable
              clearable={false}
              aria-label="Filtrar  categoria"
            />
          </Paper>
        </Stack>

        {/* Coluna Direita: Catálogo e Paginação (70% landscape) */}
        <Stack style={{ flex: 1, minWidth: 0, minHeight: 0 }} gap="xs">
          {error && (
            <Alert icon={<BsExclamationCircle size={16} />} title="Atenção" color="red" radius="md">
              {error}
            </Alert>
          )}

          {/* Products Grid */}
          <Box style={{ flex: 1, overflowY: 'scroll', paddingBottom: '16px', minHeight: 0 }}>
            {isLoading ? (
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
                {Array.from({ length: 12 }).map((_, idx) => (
                  <Card key={idx} shadow="sm" padding="lg" radius="md" withBorder h="100%" display="flex" style={{ flexDirection: 'column' }}>
                    <Card.Section>
                      <Skeleton height={180} radius={0} />
                    </Card.Section>

                    <Stack justify="space-between" mt="md" style={{ flex: 1 }}>
                      <div>
                        <Group justify="space-between" mb="xs">
                          <Skeleton height={20} width={80} radius="xl" />
                          <Skeleton height={20} width={100} radius="xl" />
                        </Group>
                        <Skeleton height={48} width="100%" mb="xs" />
                        <Skeleton height={20} width="60%" />
                      </div>
                      <div>
                        <Skeleton height={28} width={100} mb="sm" />
                        <Group grow gap="xs">
                          <Skeleton height={30} radius="sm" />
                          <Skeleton height={30} radius="sm" />
                        </Group>
                      </div>
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>
            ) : products.length === 0 ? (
              <Center py={60}>
                <Stack align="center" gap="xs">
                  <BsExclamationCircle size={40} color="#868e96" />
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
          </Box>

          {/* Pagination and Items Per Page */}
          {total > 0 && (
            <Flex direction={{ base: 'column', xs: 'row' }} align="center" justify="space-between" gap="md" mt="xs">
              <Group gap="xs">
                <Text size="sm" c="dimmed">Itens por página:</Text>
                <Select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  data={['10', '20', '30', '40', '50']}
                  w={80}
                  size="sm"
                  allowDeselect={false}
                />
              </Group>

              {totalPages > 1 && (
                <Pagination
                  total={totalPages}
                  value={page}
                  onChange={setPage}
                  disabled={isLoading}
                  color="blue.3"
                  radius="md"
                  size="sm"
                  siblings={1}
                  boundaries={1}
                  withControls={false}
                />
              )}
            </Flex>
          )}
        </Stack>
      </Flex>
    </Stack>
  );
};

export default ProductsPage;
