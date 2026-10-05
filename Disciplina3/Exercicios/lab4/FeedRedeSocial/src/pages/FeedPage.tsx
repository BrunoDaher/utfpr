import { useCallback, useState } from 'react';
import {
  Container,
  Stack,
  Title,
  Text,
  Alert,
  Skeleton,
  Group,
  Button,
  Divider,
} from '@mantine/core';
import { IconAlertTriangle, IconRefresh, IconNews } from '@tabler/icons-react';
import { api } from '../services/api';
import { PostSchema } from '../schemas/PostSchema';
import { useAsyncData } from '../hooks/useAsyncData';
import { PostCard } from '../components/PostCard';
import { NewPostForm } from '../components/NewPostForm';

export function FeedPage() {
  const [contractError, setContractError] = useState<string | null>(null);

  const fetchPosts = useCallback(async (): Promise<PostSchema[]> => {
    setContractError(null);
    const response = await api.get('/posts');

    // Validação de contrato em tempo de execução com Zod
    const validation = PostSchema.array().safeParse(response.data);

    if (!validation.success) {
      const errorDetails = validation.error.issues
        .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
        .join(', ');
      const msg = `Divergência no contrato dos dados retornado pela API: ${errorDetails}`;
      setContractError(msg);
      throw new Error(msg);
    }

    return validation.data;
  }, []);

  const { data: posts, setData: setPosts, loading, error, execute } = useAsyncData<PostSchema[]>(
    fetchPosts
  );

  const handlePostCreated = (newPost: PostSchema) => {
    setPosts((prevPosts) => (prevPosts ? [newPost, ...prevPosts] : [newPost]));
  };

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        {/* Formulário de Nova Postagem */}
        <NewPostForm onPostCreated={handlePostCreated} />

        <Divider
          my="xs"
          label={
            <Group gap="xs">
              <IconNews size={16} />
              <Text fw={600} size="sm">
                Feed de Atualizações
              </Text>
            </Group>
          }
          labelPosition="center"
        />

        {/* Alerta de Divergência de Contrato ou Erro na Requisição */}
        {(contractError || error) && (
          <Alert
            icon={<IconAlertTriangle size={20} />}
            title="Atenção: Falha na validação ou comunicação"
            color="red"
            variant="filled"
            radius="md"
          >
            <Stack gap="xs">
              <Text size="sm">
                {contractError || error || 'Não foi possível validar ou carregar os dados do feed.'}
              </Text>
              <Group justify="flex-start">
                <Button
                  size="xs"
                  variant="white"
                  color="red"
                  leftSection={<IconRefresh size={14} />}
                  onClick={() => execute()}
                >
                  Tentar Novamente
                </Button>
              </Group>
            </Stack>
          </Alert>
        )}

        {/* Header do Feed com Contador e Botão de Atualizar */}
        <Group justify="space-between" align="center">
          <div>
            <Title order={2} size="h3">
              Postagens Recentes
            </Title>
            <Text size="sm" c="dimmed">
              {loading
                ? 'Carregando publicações...'
                : posts
                ? `${posts.length} postagens encontradas`
                : 'Nenhuma postagem'}
            </Text>
          </div>
          <Button
            variant="light"
            leftSection={<IconRefresh size={16} />}
            onClick={() => execute()}
            loading={loading}
            size="sm"
          >
            Recarregar
          </Button>
        </Group>

        {/* Estado de Carregamento (Skeletons) */}
        {loading && (
          <Stack gap="md">
            {[1, 2, 3, 4].map((n) => (
              <Skeleton key={n} height={160} radius="md" />
            ))}
          </Stack>
        )}

        {/* Lista de Postagens */}
        {!loading && posts && posts.length > 0 && (
          <Stack gap="md">
            {posts.map((post) => (
              <PostCard key={post.id ?? `${post.title}-${post.userId}`} post={post} />
            ))}
          </Stack>
        )}

        {/* Estado Vazio */}
        {!loading && !error && (!posts || posts.length === 0) && (
          <Alert color="blue" title="Nenhuma publicação encontrada" radius="md">
            Seja o primeiro a publicar algo preenchendo o formulário acima!
          </Alert>
        )}
      </Stack>
    </Container>
  );
}

export default FeedPage;
