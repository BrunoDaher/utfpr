import React, { useState } from 'react';
import {
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Stack,
  Alert,
  Group,
  Badge,
  Code,
  Box,
  Center,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { IconLock, IconUser, IconAlertCircle, IconSparkles } from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginPayloadSchema, LoginPayload } from '../../schemas/auth.schema';
import { useAuth } from '../../hooks/useAuth';
import { notifications } from '@mantine/notifications';

export const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Redirection target from protected route
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin';

  const form = useForm<LoginPayload>({
    initialValues: {
      username: '',
      password: '',
    },
    validate: zodResolver(loginPayloadSchema),
  });

  const handleSubmit = async (values: LoginPayload) => {
    setErrorMessage(null);
    try {
      await login(values);
      notifications.show({
        title: 'Bem-vindo de volta!',
        message: 'Login realizado com sucesso. Acesso à área administrativa liberado.',
        color: 'teal',
      });
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const errObj = err as { response?: { data?: { message?: string } }; message?: string };
      const msg =
        errObj?.response?.data?.message ||
        errObj?.message ||
        'Credenciais inválidas. Tente novamente.';
      setErrorMessage(msg);
    }
  };

  const fillDemoCredentials = () => {
    form.setFieldValue('username', 'emilys');
    form.setFieldValue('password', 'emilyspass');
  };

  return (
    <Center py={40}>
      <Box style={{ width: '100%', maxWidth: 440 }}>
        <Paper p="xl" radius="md" withBorder shadow="md">
          <Stack gap="md">
            <Box style={{ textAlign: 'center' }}>
              <Title order={2} c="indigo.8">
                Área de Autenticação
              </Title>
              <Text c="dimmed" size="sm" mt={4}>
                Entre com suas credenciais DummyJSON para acessar o painel administrativo.
              </Text>
            </Box>

            {errorMessage && (
              <Alert icon={<IconAlertCircle size={16} />} title="Falha ao Entrar" color="red">
                {errorMessage}
              </Alert>
            )}

            <form noValidate onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="md">
                <TextInput
                  label="Nome de Usuário"
                  placeholder="Ex: emilys"
                  leftSection={<IconUser size={16} />}
                  required
                  {...form.getInputProps('username')}
                />

                <PasswordInput
                  label="Senha"
                  placeholder="Sua senha"
                  leftSection={<IconLock size={16} />}
                  required
                  {...form.getInputProps('password')}
                />

                <Button type="submit" color="indigo" fullWidth loading={isLoading} mt="sm">
                  Entrar no Sistema
                </Button>
              </Stack>
            </form>

            {/* Demo Credentials Box */}
            <Paper p="sm" radius="md" bg="indigo.0" withBorder style={{ borderColor: '#dbe4ff' }}>
              <Group justify="space-between" mb={6}>
                <Group gap={6}>
                  <IconSparkles size={16} color="#4c6ef5" />
                  <Text size="xs" fw={700} c="indigo.9">
                    Credenciais de Demonstração
                  </Text>
                </Group>
                <Badge
                  size="xs"
                  color="indigo"
                  variant="filled"
                  style={{ cursor: 'pointer' }}
                  onClick={fillDemoCredentials}
                >
                  Preencher
                </Badge>
              </Group>

              <Text size="xs" c="indigo.8" mb={4}>
                Usuário: <Code color="indigo">emilys</Code> | Senha:{' '}
                <Code color="indigo">emilyspass</Code>
              </Text>
              <Text size="xs" c="dimmed">
                Clique em "Preencher" para inserir os dados automaticamente.
              </Text>
            </Paper>
          </Stack>
        </Paper>
      </Box>
    </Center>
  );
};

export default LoginPage;
