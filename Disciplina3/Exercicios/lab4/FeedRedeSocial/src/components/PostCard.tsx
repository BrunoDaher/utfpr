import { Card, Text, Title, Badge, Avatar, Group, Stack } from '@mantine/core';
import { IconHeart, IconMessageCircle, IconShare } from '@tabler/icons-react';
import type { PostSchema } from '../schemas/PostSchema';

interface PostCardProps {
  post: PostSchema;
}

export function PostCard({ post }: PostCardProps) {
  const authorNumber = post.userId || 1;
  const authorName = `Usuário #${authorNumber}`;
  const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=user_${authorNumber}`;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="sm">
        <Group justify="space-between" align="center">
          <Group gap="sm">
            <Avatar src={avatarUrl} alt={authorName} radius="xl" color="blue">
              U{authorNumber}
            </Avatar>
            <div>
              <Text fw={600} size="sm">
                {authorName}
              </Text>
              <Text size="xs" c="dimmed">
                Post #{post.id ?? 'Novo'}
              </Text>
            </div>
          </Group>
          <Badge variant="light" color={post.id && post.id > 100 ? 'teal' : 'blue'}>
            {post.id && post.id > 100 ? 'Recente' : 'Comunidade'}
          </Badge>
        </Group>

        <div>
          <Title order={4} mb="xs" style={{ textTransform: 'capitalize' }}>
            {post.title}
          </Title>
          <Text size="sm" c="dimmed" style={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
            {post.body}
          </Text>
        </div>

        <Group justify="flex-start" gap="lg" mt="xs" pt="xs" style={{ borderTop: '1px solid var(--mantine-color-default-border)' }}>
          <Group gap={4} style={{ cursor: 'pointer' }}>
            <IconHeart size={16} color="var(--mantine-color-dimmed)" />
            <Text size="xs" c="dimmed">
              Curtir
            </Text>
          </Group>
          <Group gap={4} style={{ cursor: 'pointer' }}>
            <IconMessageCircle size={16} color="var(--mantine-color-dimmed)" />
            <Text size="xs" c="dimmed">
              Comentar
            </Text>
          </Group>
          <Group gap={4} style={{ cursor: 'pointer' }}>
            <IconShare size={16} color="var(--mantine-color-dimmed)" />
            <Text size="xs" c="dimmed">
              Compartilhar
            </Text>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
}

export default PostCard;
