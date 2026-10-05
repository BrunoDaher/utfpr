import { useState } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Textarea, Button, Paper, Title, Stack, Group } from '@mantine/core';
import { IconSend, IconPencil } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { api } from '../services/api';
import { NewPostSchema } from '../schemas/NewPostSchema';
import type { PostSchema } from '../schemas/PostSchema';

interface NewPostFormProps {
  onPostCreated: (newPost: PostSchema) => void;
}

export function NewPostForm({ onPostCreated }: NewPostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    initialValues: {
      title: '',
      body: '',
    },
    validate: {
      title: (value) => {
        const result = NewPostSchema.shape.title.safeParse(value);
        return result.success ? null : result.error.issues[0]?.message;
      },
      body: (value) => {
        const result = NewPostSchema.shape.body.safeParse(value);
        return result.success ? null : result.error.issues[0]?.message;
      },
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const parseResult = NewPostSchema.safeParse(values);
    if (!parseResult.success) {
      notifications.show({
        title: 'Dados inválidos',
        message: parseResult.error.issues[0]?.message || 'Por favor, revise os campos.',
        color: 'red',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post('/posts', {
        title: values.title,
        body: values.body,
        userId: 1,
      });

      const newPost: PostSchema = {
        id: response.data.id || Math.floor(Math.random() * 1000) + 101,
        userId: 1,
        title: values.title,
        body: values.body,
      };

      onPostCreated(newPost);
      form.reset();

      notifications.show({
        title: 'Post Criado!',
        message: 'Sua postagem foi enviada e adicionada ao feed com sucesso.',
        color: 'green',
        autoClose: 4000,
      });
    } catch (error) {
      console.error('Erro na requisição POST /posts:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper shadow="sm" radius="md" p="xl" withBorder>
      <Title order={3} mb="md">
        <Group gap="xs">
          <IconPencil size={22} color="var(--mantine-color-blue-6)" />
          <span>Criar Nova Postagem</span>
        </Group>
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Título"
            placeholder="Digite o título da sua postagem..."
            withAsterisk
            {...form.getInputProps('title')}
          />

          <Textarea
            label="Conteúdo"
            placeholder="Escreva o conteúdo da sua postagem aqui..."
            minRows={3}
            autosize
            withAsterisk
            {...form.getInputProps('body')}
          />

          <Group justify="flex-end" mt="xs">
            <Button
              type="submit"
              loading={isSubmitting}
              leftSection={<IconSend size={18} />}
              color="blue"
            >
              Publicar
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}

export default NewPostForm;
